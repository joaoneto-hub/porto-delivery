// src/controllers/userController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import UserModel from '../Models/userModel';
import { User } from '../Models/User';

class UserController {
  // Retorna todos os usuários
  static async getAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users: User[] = await UserModel.getAll();
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar usuários', details: error.message });
    }
  }

  // Retorna um usuário específico
  static async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { userId } = request.params as { userId: string };

    try {
      const user = await UserModel.getById(userId);
      if (!user) {
        reply.status(404).send({ error: 'Usuário não encontrado' });
        return;
      }
      reply.send(user);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar usuário', details: error.message });
    }
  }

  // Cria um novo usuário
  static async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userData = request.body as Omit<User, 'id'>;

    try {
      const newUser = await UserModel.create(userData);
      reply.status(201).send(newUser);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar usuário', details: error.message });
    }
  }
}

export default UserController;
