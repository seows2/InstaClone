import Hangul from "hangul-js";

export default {
  Query: {
    searchPost: async (_, args, { prisma }) => {
      const { term } = args;
      let searchPost = [];
      let searcher = new Hangul.Searcher(term);
      const post = await prisma.posts();
      post.map(element => {
        if (
          searcher.search(element.location) >= 0 ||
          searcher.search(element.caption) >= 0
        ) {
          searchPost.push(element);
        }
      });
      return searchPost;
    }
  }
};
