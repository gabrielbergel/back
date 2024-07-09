import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacaoService";

class AvaliacaoController {
  async createAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoService.createAvaliacao(req.body);
      return res.status(201).json(avaliacao);
    } catch (error) {
      return res.status(500).json({ error: "Erro criando avaliacao" });
    }
  }

  async getAvaliacoes(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacaos = await avaliacaoService.getAllAvaliacoes();
      if (avaliacaos) {
        return res.status(200).json(avaliacaos);
      }
      return res.status(404).json({ error: "Avaliacoes não encontrados" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por avaliacaos" });
    }
  }

  async getAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoService.getAvaliacaoById(Number(req.params.id));
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao não encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por avaliacao" });
    }
  }

  async updateAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      const avaliacao = await avaliacaoService.updateAvaliacao(
        Number(req.params.id),
        req.body
      );
      if (avaliacao) {
        return res.status(200).json(avaliacao);
      }
      return res.status(404).json({ error: "Avaliacao não encontrada" });
    } catch (error) {
      return res.status(500).json({ error: "Error atualizando avaliacao" });
    }
  }

  async deleteAvaliacao(req: Request, res: Response): Promise<Response> {
    try {
      await avaliacaoService.deleteAvaliacao(Number(req.params.id));
      return res.status(200).json({ message: "Avaliacao deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro deletando avaliacao" });
    }
  }
}

export default new AvaliacaoController();