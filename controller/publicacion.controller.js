import * as modeloPublicacion from "../models/publicacion.model.js";
import jwt from "jsonwebtoken";

//Tenemos muchas opciones, entre ellas se va a variar entre constantes con funciones anonimas asincronicas o funciones declaradas aincronicas
//Un simple retorno de las publicaciones
export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await modeloPublicacion.obtenerPublicaciones();

    if (!publicaciones) {
      return res.status(404).json({
        cod: 404,
        msj: "Problema al obtener las publicaciones.",
        datos: null,
      });
    }

    res.status(200).json({ cod: 200, msj: "Exito", datos: publicaciones });
  } catch (error) {
    console.error("Error obteniendo publicaciones: ", error);
    res.status(500).json({
      cod: 500,
      msj: "Error obteniendo las publicaciones",
      datos: null,
    });
  }
};

export async function crearPublicacion(req, res) {
  try {
    const { pu_titulo, pu_descripcion, pu_imagen, pu_ubicacion } = req.body;

    if (!pu_titulo || !pu_descripcion || !pu_imagen || !pu_ubicacion) {
      return res
        .status(400)
        .json({ cod: 400, msj: "Datos incompletos", datos: null });
    }

    const publicacion = await modeloPublicacion.insertarPublicacion(
      pu_titulo,
      pu_descripcion,
      pu_imagen,
      pu_ubicacion,
      req.id
    );

    res
      .status(201)
      .json({ cod: 201, msj: "Publicacion creada!", datos: publicacion });
  } catch (error) {
    console.error("Error al crear una publicacion", error);
    res
      .status(500)
      .json({ cod: 500, msj: "Error al crear una publicacion", datos: null });
  }
}

export const getAllPostsController = async (req, res) => {
    try {
        const publicaciones = await modeloPublicacion.getAllPosts();
        res.json(publicaciones);
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        res.status(500).json({ error: "Error al obtener publicaciones" });
    }
};

export async function getAllTagsController(req, res) {
    try {
        const resultado = await modeloPublicacion.getAllTags();
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};