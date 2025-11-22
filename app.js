import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import { petsRouter } from "./routes/orquestador.routes.js";

//Data para conectarse al esquema de postgresql, si no creaste un user en postgresql entonces ocupa los valores por defecto(sin contar la database porque esta si se crea)!
const { Pool } = pkg;
export const pool = new Pool({
  user: "cristhian",
  host: "localhost",
  database: "dae",
  password: "femayor9",
  port: 5432,
});

//dotenv es necesario para cargar las variables de entorno
dotenv.config();
const app = express();

//Middleware

//Permite al framework express recibir peticiones desde otros dominios(en este caso el 4200 de angular)
app.use(cors());
//Permite al framework express leer/entender la data de los JSON que le envian
app.use(express.json());

//Rutas (Middleware implicito)
//Si despues del http://localhost:3000 agrega /pets, entonces lo mandara a todos los endpoints disponibles para publicaciones
app.use("/pets", petsRouter);

//Fin de Middleware

//Verificacion de que todo ok ok
app.get("/check", (req, res) => {
  res.json({ status: "ok", message: "El servidor esta corriendo!" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor a la escucha mediante el puerto http://localhost:${PORT}`
  );
});
