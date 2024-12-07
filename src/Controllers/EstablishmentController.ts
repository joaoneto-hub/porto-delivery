// src/controllers/userController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import EstablishmentModel from "../Models/EstablishmentModel";
import { Establishment } from "../Models/Establishment";

class EstablishmentController {
  // Lista todos os estabelecimentos
  static async getAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<Establishment[]> {
    const establishments = await EstablishmentModel.getAll();
    reply.send(establishments);
    return establishments;
  }

  // Busca um estabelecimento por ID
  static async getByUserId(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const userId = (req.params as { id: string }).id;
      const establishments = await EstablishmentModel.getByUserId(userId);

      if (establishments.length === 0) {
        reply
          .status(404)
          .send({
            error: "Nenhum estabelecimento encontrado para este usuário.",
          });
        return;
      }

      reply.send(establishments);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido.";
      reply
        .status(500)
        .send({ error: "Erro interno do servidor.", details: errorMessage });
    }
  }

  // Cria um novo estabelecimento
  static async create(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<Establishment> {
    const establishmentData = req.body as Establishment;
    const establishment = await EstablishmentModel.create(establishmentData);
    reply.status(201).send(establishment);
    return establishment;
  }
}

export default EstablishmentController;
