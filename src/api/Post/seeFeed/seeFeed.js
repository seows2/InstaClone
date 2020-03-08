export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();

      //자신의 아이디 포함 포스트 배열에 담아 리턴
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
