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
    likeCount: (parent, _, { prisma }) =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
