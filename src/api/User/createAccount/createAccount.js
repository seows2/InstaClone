export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const { username, email, name = "", bio = "" } = args;
      const existUser = await prisma.$exists.user({ username });
      const existEmail = await prisma.$exists.user({ email });
      if (existUser) {
        throw Error("이미 존재하는 닉네임입니다.");
      }
      if (existEmail) {
        throw Error("이미 존재하는 이메일입니다.");
      }
      try {
        await prisma.createUser({
          username,
          email,
          name,
          bio
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
