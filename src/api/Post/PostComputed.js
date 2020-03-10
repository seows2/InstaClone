export default {
  Post: {
    isLiked: (parent, __, { request, prisma }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          { post: { id } }
        ]
      });
    },
    likeCount: (parent, _, { prisma }) => {
      return prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count();
    },
    files: (parent, _, { prisma }) => prisma.post({ id: parent.id }).files(),
    comments: (parent, _, { prisma }) =>
      prisma.post({ id: parent.id }).comments(),
    user: (parent, _, { prisma }) => prisma.post({ id: parent.id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
