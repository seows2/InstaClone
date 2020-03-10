export default {
  Query: {
    getMyProfile: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.user({ id: user.id });
      //const posts = await prisma.user({ id: user.id }).posts();
      //return {
      //  user: userProfile,
      //  posts
      //};
    }
  }
};
