import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import { petsRouter } from "./routes/orquestador.routes.js";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pets", petsRouter);

app.listen(3000, () => {
  console.log("Servidor a la escucha mediante el puerto http://localhost:3000");
});
