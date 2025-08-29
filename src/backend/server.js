
import express from "express";
import http from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// REST controllers


// GraphQL
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolver.js";
import { pubsub } from "./graphql/pubsub.js";
// mongodb://localhost:27017/successive-db
import router from "./router/userRouter.js";
// 🔹 Connect MongoDB
await mongoose.connect("mongodb://localhost:27017/successive-db");
console.log("✅ MongoDB connected");

const app = express();
const httpServer = http.createServer(app); // create HTTP server from Express

// 🔹 REST middleware
app.use(cors(
  {
    origin:"http://localhost:3000",
    credentials: true
  }
));
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", router);
// 🔹 Build GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apollo Server
const server = new ApolloServer({ schema });
await server.start();

// GraphQL HTTP endpoint
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      let verifyUser = null;
      try {
        if (token) verifyUser = jwt.verify(token, "secret_key123");
      } catch {}
      return { pubsub, verifyUser };
    },
  })
);

// WebSocket Server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
// eslint-disable-next-line react-hooks/rules-of-hooks
useServer({ schema, context: () => ({ pubsub }) }, wsServer); // wrote above to prevent error

// 🔹 Start the server
const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log(`🚀 REST API: http://localhost:8000`);
  console.log(`🚀 GraphQL: http://localhost:${PORT}/graphql`);
  console.log(`🚀 Subscriptions ws://localhost:${PORT}/graphql`);
});

