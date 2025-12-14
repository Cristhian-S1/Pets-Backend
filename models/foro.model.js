import { pool } from "../app.js";

export const obtenerForosModelo = async () => {
  const result = await pool.query(
    `SELECT fo_id, fo_titulo, fo_descripcion, fo_visible, fo_icono, fo_eliminacion, us_id, us_nombre
        FROM FORO
        JOIN USUARIOS using(us_id)
        WHERE fo_eliminacion = false
        ORDER BY fo_id DESC`
  );
  return result.rows;
};

export const obtenerForoPorIdModelo = async (foID) => {
  const result = await pool.query(`SELECT * FROM foro WHERE fo_id = $1`, [
    foID,
  ]);
  return result.rows[0];
};

export const crearForoModelo = async (
  foTITULO,
  foDESCRIPCION,
  foVISIBLE,
  foICONO,
  usID
) => {
  const result = await pool.query(
    `INSERT INTO foro (fo_titulo, fo_descripcion, fo_visible, fo_icono, fo_eliminacion, us_id)
        VALUES ($1, $2, $3, $4, FALSE, $5)
        RETURNING *`,
    [foTITULO, foDESCRIPCION, foVISIBLE, foICONO, usID]
  );
  return result.rows[0];
};
