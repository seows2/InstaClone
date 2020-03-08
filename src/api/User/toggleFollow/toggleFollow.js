import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleFollow: async (_, args, { request, prisma }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;

      try {
        const existFollow = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id } }]
        });

        if (existFollow) {
          await prisma.updateUser({
            where: {
              id: user.id
            },
            data: {
              following: {
                disconnect: { id }
              }
            }
          });
        } else {
          await prisma.updateUser({
            where: {
              id: user.id
            },
            data: {
              following: {
                connect: { id }
              }
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
