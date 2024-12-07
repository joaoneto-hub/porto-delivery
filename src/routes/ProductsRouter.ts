// src/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import ProductsController from "../Controllers/ProductsController";

async function ProductsRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/products", ProductsController.create);
  fastify.get("/products/:userId", ProductsController.getAllById);
  fastify.delete("/products/:id", ProductsController.delete);
  fastify.patch("/products/:id", ProductsController.update);
}

export default ProductsRoutes;
