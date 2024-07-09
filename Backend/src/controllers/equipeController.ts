import { Request, Response } from "express";
import equipeService from "../services/equipeService";

class EquipeController {
  async createEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await equipeService.createEquipe(req.body);
      return res.status(201).json(equipe);
    } catch (error) {
      return res.status(500).json({ error: "Erro criando equipe" });
    }
  }

  async getEquipes(req: Request, res: Response): Promise<Response> {
    try {
      const equipes = await equipeService.getAllEquipes();
      if (equipes) {
        return res.status(200).json(equipes);
      }
      return res.status(404).json({ error: "Equipes não encontrados" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por equipes" });
    }
  }

  async getEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await equipeService.getEquipeById(Number(req.params.id));
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe não encontrado" });
    } catch (error) {
      return res.status(500).json({ error: "Erro buscando por equipe" });
    }
  }

  async updateEquipe(req: Request, res: Response): Promise<Response> {
    try {
      const equipe = await equipeService.updateEquipe(
        Number(req.params.id),
        req.body
      );
      if (equipe) {
        return res.status(200).json(equipe);
      }
      return res.status(404).json({ error: "Equipe não encontrada" });
    } catch (error) {
      return res.status(500).json({ error: "Erro atualizando equipe" });
    }
  }

  async deleteEquipe(req: Request, res: Response): Promise<Response> {
    try {
      await equipeService.deleteEquipe(Number(req.params.id));
      return res.status(200).json({ message: "Equipe deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro deletando equipe" });
    }
  }
}

export default new EquipeController();