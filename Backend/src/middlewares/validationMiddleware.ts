// src/middlewares/validationMiddleware.ts
import { check, validationResult,CustomValidator } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AvaliadorModel } from "../models/avaliadorModel";
import { EquipeModel } from "../models/equipeModel";
import pool from "../server";

const validateAvaliador = [
  check("nome").isString().notEmpty(),
  check("login").isString().notEmpty().custom(async (login, { req }) => {
    const avaliador = await AvaliadorModel.findByLogin(login);
    if (avaliador) {
      throw new Error("Login já está em uso");
    }
  }),
  check("senha").isLength({ min: 8 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateAvaliador;


const validateEquipe = [
    check("nome").isString().notEmpty().custom(async (nome, { req }) => {
      const equipe = await EquipeModel.findByNome(nome);
      if (equipe) {
        throw new Error("Nome já está em uso");
      }
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  const checkAvaliacaoExistente: CustomValidator = async (value, { req }) => {
    const { avaliador_id, equipe_id } = req.body;
    const result = await pool.query(
      'SELECT * FROM avaliacoes WHERE avaliador_id = $1 AND equipe_id = $2',
      [avaliador_id, equipe_id]
    );
    if (result.rows.length > 0) {
      throw new Error('O avaliador já avaliou esta equipe.');
    }
    return true;
  };
  
  const validateAvaliacao = [
    check('avaliador_id').isNumeric().notEmpty(),
    check('equipe_id').isNumeric().notEmpty(),
    check('notas').isObject().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  export { validateAvaliador, validateEquipe, validateAvaliacao };