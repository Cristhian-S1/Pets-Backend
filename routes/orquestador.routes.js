import { Router } from "express";
import { getPublicaciones } from "../controller/productos.controller.js";
import { protegido } from "../controller/auth.controller.js";
import { login } from "../controller/auth.controller.js";
import { verificarToken } from "../verificador.token.js";

export const petsRouter = Router();

//Si escoguiste http://localhost:3000/publicaciones, Omedeto! Aca puedes usar o definir las rutas a los endpoints
petsRouter.get("/publicaciones", getPublicaciones);

petsRouter.post("/auth/login", login);
petsRouter.get("/auth/protegido", verificarToken, protegido);
//petsRouter.get("/auth/register", register);
