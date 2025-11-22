import { pool } from "../app.js";

//El pool es la variable definida en app.js para conectarse al esquema postgresql

//Consultas, logicas, validacioes, todo lo maneja el modelo!
//No usamos ORM por simplicidad ante lo que ofrece las consultas SQL, DI NO A ORM!
export const obtenerPublicaciones = async () => {
  const resultado = await pool.query(`select * from publicacion`);
  return resultado.rows;
};
