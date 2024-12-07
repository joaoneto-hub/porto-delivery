// src/routes/authRoutes.ts
import { FastifyInstance } from "fastify";
import AuthController from "../Controllers/authController";

async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/login", AuthController.login);
}

export default authRoutes;
