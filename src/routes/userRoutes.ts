// src/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import UserController from "../Controllers/userController";

async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/users", UserController.getAll);
  fastify.get("/users/:userId", UserController.getById);
  fastify.post("/users", UserController.create);
}

export default userRoutes;
