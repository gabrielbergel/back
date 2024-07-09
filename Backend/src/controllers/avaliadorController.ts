import { Request, Response } from "express";
import avaliadorService from "../services/avaliadorService";

class AvaliadorController {
  async createAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await avaliadorService.createAvaliador(req.body);
      return res.status(201).json(avaliador);
    } catch (error) {
      return res.status(500).json({ error: "Erro criando avaliador" });
    }
  }

  async getAvaliadores(req: Request, res: Response): Promise<Response> {
    try {
      const avaliadores = await avaliadorService.getAllAvaliadores();
      if (avaliadores) {
        return res.status(200).json(avaliadores);
      }
      return res.status(404).json({ error: "Avaliadores não encontrados" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por avaliadores" });
    }
  }

  async getAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await avaliadorService.getAvaliadorById(Number(req.params.id));
      if (avaliador) {
        return res.status(200).json(avaliador);
      }
      return res.status(404).json({ error: "Avaliador não encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por avaliador" });
    }
  }

  async updateAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      const avaliador = await avaliadorService.updateAvaliador(
        Number(req.params.id),
        req.body
      );
      if (avaliador) {
        return res.status(200).json(avaliador);
      }
      return res.status(404).json({ error: "Avaliador não encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro atualizando avaliador" });
    }
  }

  async deleteAvaliador(req: Request, res: Response): Promise<Response> {
    try {
      await avaliadorService.deleteAvaliador(Number(req.params.id));
      return res.status(200).json({ message: "Avaliador deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro deletando avaliador" });
    }
  }
}

export default new AvaliadorController();