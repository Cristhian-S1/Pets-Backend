import { pool } from "../app.js";

export const loginModelo = async (us_email, us_contrasena) => {
  const result = await pool.query(
    `select * from usuarios where us_email = $1 
        and us_contrasena = $2`,
    [us_email, us_contrasena]
  );
  return result.rows[0];
};
