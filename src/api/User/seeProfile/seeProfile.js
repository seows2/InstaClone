export default {
  Query: {
    seeProfile: async (_, args, { prisma }) => {
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).post();
      return {
        user,
        posts
      };
    }
  }
};
