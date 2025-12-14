import { pool } from "../app.js";

export const obtenerForosModelo = async () => {
    const result = await pool.query(
        `SELECT fo_id, fo_titulo, fo_descripcion, fo_eliminacion, us_id
        FROM FORO
        WHERE fo_eliminacion = false
        ORDER BY fo_id DESC`
    )
    return result.rows;
}

export const obtenerForoPorIdModelo = async (foID) => {
    const result = await pool.query(
        `SELECT * FROM foro WHERE fo_id = $1`,
        [foID]
    )
    return result.rows[0];
}

export const crearForoModelo = async (foTITULO, foDESCRIPCION, usID) => {
    const result = await pool.query(
        `INSERT INTO foro (fo_titulo, fo_descripcion, fo_eliminacion, us_id)
        VALUES ($1, $2, FALSE, $3)
        RETURNING *`,
        [foTITULO, foDESCRIPCION, usID]
    )
    return result.rows[0];
    
}
