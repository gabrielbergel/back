import { Router } from "express";
import avaliacaoController from "../controllers/avaliacaoController";
import { validateAvaliacao } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateAvaliacao, avaliacaoController.createAvaliacao);
router.get("/", avaliacaoController.getAvaliacoes);
router.get("/:id", avaliacaoController.getAvaliacao);
router.put("/:id", validateAvaliacao, avaliacaoController.updateAvaliacao);
router.delete("/:id", avaliacaoController.deleteAvaliacao);

export default router;