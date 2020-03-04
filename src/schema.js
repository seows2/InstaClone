import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const AllTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const AllResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

//해당 디렉토리에 있는 모든 타입과(.graphql) Resolver(.js)를 가져옴

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(AllTypes),
  resolvers: mergeResolvers(AllResolvers)
});

export default schema;
