export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const { username, email, name = "", bio = "" } = args;
      const user = await prisma.createUser({
        username,
        email,
        name,
        bio
      });
      return user;
    }
  }
};
