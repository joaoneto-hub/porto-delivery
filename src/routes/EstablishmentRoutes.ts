// src/routes/userRoutes.ts
import { FastifyInstance } from "fastify";

import EstablishmentController from "../Controllers/EstablishmentController";

async function EstablishmentRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/Establishment", EstablishmentController.create);
  fastify.get("/Establishment/:id", EstablishmentController.getByUserId);
}

export default EstablishmentRoutes;
