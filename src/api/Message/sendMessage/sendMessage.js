import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      // room 생성 중복 방지
      if (roomId === undefined) {
        //채팅방이 없다면 만들기
        if (user.id !== toId) {
          //유저 자신이 자신과 대화하는 상황 차단
          room = await prisma
            .createRoom({
              participants: {
                connect: [{ id: toId }, { id: user.id }]
                //채팅을 요청한 사람과 요청된 사람을 연결(참가)
              }
            })
            .$fragment(ROOM_FRAGMENT);
          console.log("ROOM", room);
        }
      } else {
        //채팅방이 있다면 채팅방 찾기
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("채팅방을 찾지 못했습니다.");
      }
      const getTo = room.participants.filter(
        participant => participant.id !== user.id
      );
      console.log("getTo", getTo);

      //그리고 메세지 생성
      const newMessage = await prisma.createMessage({
        text: message,
        from: {
          //메세지는 요청한 사람으로부터 옴(from)
          connect: {
            id: user.id
          }
        },
        to: {
          //만약 RoomId가 있다면 toId는 존재하지 X
          connect: { id: roomId ? getTo[0].id : toId }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
      return newMessage;
    }
  }
};
