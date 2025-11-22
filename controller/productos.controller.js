import * as ModelosProductos from "../models/producto.model.js";

//Un simple retorno de las publicaciones
export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await ModelosProductos.obtenerPublicaciones();

    if (!publicaciones) {
      return res
        .status(404)
        .json({ error: "Problema al obtener las publicaciones." });
    }

    res.json(publicaciones);
  } catch (error) {
    console.error("Error obteniendo publicaciones: ", error);
    res.status(500).json({ error: "Error obteniendo las publicaciones" });
  }
};
