export default {
  User: {
    isFollowing: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
        return exists;
      } catch (error) {
        return false;
      }
    },
    isMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
