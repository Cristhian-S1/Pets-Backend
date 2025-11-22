import * as ModelosAuth from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import { verificarToken } from "../verificador.token.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const logeo = await ModelosAuth.loginModelo(email, password);

    if (!logeo) {
      return res.status(401).json({ error: "Email o contrasena incorrectos" });
    }

    //Literal esto es todo XD, defines que quieres pasarle al token en formato json, tu clave y el tiempo que quieres que expire, listo
    const token = jwt.sign(
      {
        id: logeo.us_id,
        email: logeo.us_email,
        contacto: logeo.us_contacto,
      },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ message: "Login exitoso", usuario: logeo, token: token });
  } catch (error) {
    console.error("Error en login: ", error);
    res.status(500).json({ error: "Error en el login" });
  }
};

export const protegido = async (req, res) => {
  return res.status(200).json({ message: "You have access" });
};

//export const register = async (req, res) => {};
