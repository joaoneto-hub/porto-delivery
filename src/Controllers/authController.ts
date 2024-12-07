// src/controllers/authController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

class AuthController {
  // Autenticação de um usuário com e-mail e senha
  static async login(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    request.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      reply.send({ user: userCredential.user });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      reply.status(500).send({
        error: "Erro ao autenticar o usuário",
        details: errorMessage,
      });
    }
  }
}

export default AuthController;
