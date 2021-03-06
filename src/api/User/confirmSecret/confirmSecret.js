import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        return generateToken(user.id);
      } else {
        throw Error("값이 다릅니다.");
      }
    }
  }
};
