import Fastify from "fastify";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import EstablishmentRoutes from "./routes/EstablishmentRoutes"
import cors from "@fastify/cors";
import dotenv from 'dotenv';

dotenv.config();



const app = Fastify({logger: true})

const start = async () => {
  dotenv.config();
  await app.register(cors)
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(EstablishmentRoutes)

  try{
    await app.listen({ port: 3333 });
  }catch(err){
    process.exit(1)
  }
}

start() 