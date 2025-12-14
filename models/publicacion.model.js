import { pool } from "../app.js";

//El pool es la variable definida en app.js para conectarse al esquema postgresql

//Consultas, logicas, validacioes, todo lo maneja el modelo!
//No usamos ORM por simplicidad ante lo que ofrece las consultas SQL, DI NO A ORM!
export const obtenerPublicaciones = async () => {
  const resultado = await pool.query(`select pu_id, pu_titulo,
       pu_descripcion,
       pu_image,
       pu_fecha,
       pu_estado,
       pu_ubicacion,
       us_nombre,
       us_contacto
  from publicacion
  join usuarios
using ( us_id )
 where pu_eliminacion is false;`);
  return resultado.rows;
};

export async function insertarPublicacion(
  cliente,
  pu_titulo,
  pu_descripcion,
  pu_imagen,
  pu_ubicacion,
  us_id
) {
  const resultado = await cliente.query(
    `insert into publicacion (   
   pu_titulo,
   pu_descripcion,
   pu_image,
   pu_fecha,
   pu_eliminacion,
   pu_estado,
   pu_ubicacion,
   us_id,
   fo_id) values($1, $2, $3, current_date, false, false,$4, $5, null) returning *`,
    [pu_titulo, pu_descripcion, pu_imagen, pu_ubicacion, us_id]
  );

  return resultado.rows[0];
}

export async function insertarImagenes(cliente, pu_id, urls) {
  const results = [];

  for (const url of urls) {
    const { rows } = await cliente.query(
      `INSERT INTO publicacion_imagen (pu_id, pui_url)
       VALUES ($1, $2)
       RETURNING *;`,
      [pu_id, url]
    );
    results.push(rows[0]);
  }

  return results;
}

export async function insertarEtiquetas(cliente, pu_id, etiquetas) {
  const results = [];

  for (const et_id of etiquetas) {
    const { rows } = await cliente.query(
      `INSERT INTO publicacion_etiqueta (pu_id, et_id)
       VALUES ($1, $2)
       RETURNING *;`,
      [pu_id, et_id]
    );
    results.push(rows[0]);
  }

  return results;
}

export async function getAllTags() {
  const resultado = await pool.query(`select * from etiqueta`);
  return resultado.rows;
}

export async function visualizarDetalles(pu_id) {
  const resultado = await pool.query(
    `select pu_id, pu_titulo, 
    pu_descripcion, pu_image, pu_fecha, pu_estado, pu_ubicacion from publicacion
where pu_id = $1`,
    [pu_id]
  );

  return resultado.rows[0];
}

export async function obtenerListaImagenes(pu_id) {
  const resultado = await pool.query(
    `select * from publicacion_imagen where pu_id = $1`,
    [pu_id]
  );

  return resultado.rows;
}

export async function obtenerListaEtiquetas(pu_id) {
  const resultado = await pool.query(
    `select et_nombre from etiqueta
join publicacion_etiqueta using(et_id) where pu_id = $1`,
    [pu_id]
  );

  return resultado.rows;
}

export async function getAllPosts(us_id_actual = null) {
  const query = `
    SELECT 
        p.*,
        u.us_nombre AS us_nombre_completo,
        u.us_contacto,
        -- Subconsulta para contar el total de likes
        (SELECT COUNT(*)::int FROM reacciones r WHERE r.pu_id = p.pu_id) AS total_likes,
        -- Subconsulta para saber si el usuario actual dio like (devuelve true/false)
        CASE 
            WHEN $1::int IS NOT NULL THEN 
                EXISTS(SELECT 1 FROM reacciones r WHERE r.pu_id = p.pu_id AND r.us_id = $1)
            ELSE false 
        END AS dio_like,
        COALESCE(
            (
                SELECT json_agg(
                    json_build_object(
                        'et_id', et.et_id,
                        'et_nombre', et.et_nombre
                    )
                )
                FROM etiqueta et
                WHERE et.et_id IN (
                    SELECT pe.et_id
                    FROM publicacion_etiqueta pe
                    WHERE pe.pu_id = p.pu_id
                )
            ), '[]'
        ) AS etiquetas
    FROM usuarios u 
    JOIN publicacion p ON u.us_id = p.us_id
    WHERE p.pu_eliminacion is false
    GROUP BY 
        p.pu_id, u.us_nombre, u.us_contacto
    ORDER BY p.pu_fecha DESC
  `;

  const resultado = await pool.query(query, [us_id_actual]);
  return resultado.rows;
}
// 1. Lógica para dar/quitar like
export async function gestionarReaccion(cliente, pu_id, us_id) {
  const check = await cliente.query(
    "SELECT re_id FROM reacciones WHERE pu_id = $1 AND us_id = $2",
    [pu_id, us_id]
  );

  if (check.rows.length > 0) {
    await cliente.query("DELETE FROM reacciones WHERE pu_id = $1 AND us_id = $2", [pu_id, us_id]);
    return { like: false }; // Se quitó el like
  } else {
    await cliente.query("INSERT INTO reacciones (pu_id, us_id) VALUES ($1, $2)", [pu_id, us_id]);
    return { like: true }; // Se agregó el like
  }
}

// 2. Obtener conteo rápido (para actualizar UI)
export async function obtenerConteoLikes(pu_id) {
    const res = await pool.query("SELECT COUNT(*)::int as t FROM reacciones WHERE pu_id=$1", [pu_id]);
    return res.rows[0].t;
}
