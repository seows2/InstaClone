export default {
  Query: {
    getProfile: async (_, args, { prisma }) => {
      const { id } = args;
      return await prisma.user({ id });
      //const posts = await prisma.user({ id }).post();
      //return {
      //user,
      //        posts
      //      };
    }
  }
};
