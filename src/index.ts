import Fastify from "fastify";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import EstablishmentRoutes from "./routes/EstablishmentRoutes";
import ProductsRoutes from "./routes/ProductsRouter";
import cors from "@fastify/cors";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });

const start = async () => {
  dotenv.config();
  await app.register(cors);
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(EstablishmentRoutes);
  app.register(ProductsRoutes);

  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};

start();
