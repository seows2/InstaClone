import Hangul from "hangul-js";

const fragment = `
  fragment list on Users {
    id
    name
    username
  }
`;
export default {
  Query: {
    searchUser: async (_, args, { prisma }) => {
      const { term } = args;
      let searchUser = [];
      let searcher = new Hangul.Searcher(term);
      const user = await prisma.users().$fragment(fragment);
      user.map(element => {
        if (
          searcher.search(element.name) >= 0 ||
          searcher.search(element.username) >= 0
        ) {
          searchUser.push(element);
        }
      });

      return searchUser;
    }
  }
};
