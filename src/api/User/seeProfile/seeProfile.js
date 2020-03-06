export default {
  Query: {
    seeProfile: (_, args, { prisma }) => {
      const { id } = args;
      return prisma.user({ id });
    }
  }
};
