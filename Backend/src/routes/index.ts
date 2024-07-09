import express from "express";
import avaliadorRoute from "./avaliadorRoute";
import equipeRoute from "./equipeRoute";
import avaliacaoRoute from "./avaliacaoRoute"

const appRouter = express();

appRouter.use("/avaliador", avaliadorRoute);
appRouter.use("/equipe", equipeRoute);
appRouter.use("/avaliacao", avaliacaoRoute);

export default appRouter;