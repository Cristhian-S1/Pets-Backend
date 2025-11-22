import { Router } from "express";
import { getPublicaciones } from "../controller/endpoints.js";
export const petsRouter = Router();

//Si escoguiste http://localhost:3000/publicaciones, Omedeto! Aca puedes usar o definir las rutas a los endpoints
petsRouter.get("/", getPublicaciones);
