import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;

      const existRoom = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      console.log(existRoom);

      if (existRoom) {
        return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("채팅방이 존재하지 않습니다.");
      }
    }
  }
};
