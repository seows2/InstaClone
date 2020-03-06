export default {
  Mutation: {
    editProfile: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { username, email, name, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, name, bio }
      });
    }
  }
};
