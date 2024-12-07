// src/controllers/authController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

class AuthController {
  // Autenticação de um usuário com e-mail e senha
  static async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password }: { email: string; password: string } = request.body;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      reply.send({ user: userCredential.user });
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao autenticar o usuário', details: error.message });
    }
  }
}

export default AuthController;
