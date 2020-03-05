import dotenv from "dotenv";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

dotenv.config({ path: path.resolve(__dirname, ".env") });

//sendSecretMail("seows2@naver.com", "123");
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(` ✅  Server http://localhost:${PORT}`)
);
