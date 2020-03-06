export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        const existLike = await prisma.$exists.like(filterOptions);
        if (existLike) {
          //좋아요 지우기 기능 만들기
          await prisma.deleteManyLikes(filterOptions);
        } else {
          //좋아요가 존재하지 않을때 좋아요만들기
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
