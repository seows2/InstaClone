import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";

dotenv.config();

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "HI"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () =>
  console.log(` ✅  Server http://localhost:${PORT}`)
);
