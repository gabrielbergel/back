import express from "express";
import cors from "cors";
import appRouter from "./routes";


const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3001", // ou o domínio do seu frontend em produção
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);

app.use("/api", appRouter);
export default app;