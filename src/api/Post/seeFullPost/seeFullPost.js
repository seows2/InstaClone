export default {
  Query: {
    seeFullPost: (_, args, { prisma }) => {
      const { id } = args;
      return prisma.post({ id });
    }
  }
};
