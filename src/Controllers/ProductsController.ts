import { FastifyReply, FastifyRequest } from "fastify";
import ProductsModel from "../Models/ProductsModel";

class ProductsController {
  static async getAllById(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { userId } = req.params as { userId: string };
      if (!userId) {
        reply.status(400).send({ error: "O ID do usuário é obrigatório." });
        return;
      }
      const products = await ProductsModel.getProductsByUserId(userId);
      reply.status(200).send(products);
    } catch (error) {
      reply.status(500).send({ error: "Erro interno do servidor." });
    }
  }
  static async create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { name, price, description, userId } = req.body as {
        name: string;
        price: number;
        description: string;
        userId: string;
      };
      if (!name || !price || !userId) {
        reply
          .status(400)
          .send({ error: "Nome, preço e userId são obrigatórios." });
        return;
      }

      const productId = await ProductsModel.createProduct({
        name,
        price,
        description,
        userId,
      });
      reply
        .status(201)
        .send({ message: "Produto criado com sucesso.", productId });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      reply.status(500).send({ error: "Erro interno do servidor." });
    }
  }

  static async delete(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        reply.status(400).send({ error: "O ID do produto é obrigatório." });
        return;
      }

      await ProductsModel.deleteProduct(id);

      reply.status(200).send({ message: "Produto deletado com sucesso." });
    } catch (error) {
      reply.status(500).send({ error: "Erro interno do servidor." });
    }
  }

  static async update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { name, price, description } = req.body as {
        name?: string;
        price?: number;
        description?: string;
      };

      if (!id) {
        reply.status(400).send({ error: "O ID do produto é obrigatório." });
        return;
      }

      if (!name && price === undefined && !description) {
        reply
          .status(400)
          .send({ error: "Forneça pelo menos um campo para atualização." });
        return;
      }

      await ProductsModel.updateProduct(id, { name, price, description });

      reply.status(200).send({ message: "Produto atualizado com sucesso." });
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: "Erro interno do servidor." });
    }
  }
}

export default ProductsController;
