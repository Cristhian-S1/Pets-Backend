import * as foroModel from '../models/foro.model.js'
import { pool } from "../app.js";

export const listarForos = async (req, res) => {
    try {
        const lista = await foroModel.obtenerForosModelo();
        res.json({foros:lista});
    } catch (error) {
        console.error("Error al obtener foros:", error);
        res.status(500).json({ msj: "Error interno del servidor"});;
    }
};

export const verForo = async (req, res) => {
    try {
        const { id } = req.params;
        const foro = await foroModel.obtenerForoPorIdModelo(id);
        if (!foro){
            return res.statu(404).json({msj: "Foro no encontrado"});
        }
        res.json(foro);
    } catch (error) {
        console.error("Error al obtener el foro:", error);
        res.status(500).json({msj: "Error interno."});
    }
};

export const crearForo = async (req, res) => {
    try {
        const { fo_titulo, fo_descripcion, us_id } = req.body; 
        if (!fo_titulo || !fo_descripcion || !us_id) {
            return res.status(400).json({ msj: "Datos incompletos para crear el foro" });
        }
        const nuevoForo = await foroModel.crearForoModelo(fo_titulo, fo_descripcion, us_id);
        res.status(201).json(nuevoForo);

    } catch (error) {
        console.error("Error al crear el foro:", error);
        res.status(500).json({ msj: "Error interno del servidor al crear el foro" });
    }
};