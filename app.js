import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import { petsRouter } from "./routes/orquestador.routes.js";


dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use("/pets", petsRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor a la escucha mediante el puerto http://localhost:${PORT}`
  );
});
