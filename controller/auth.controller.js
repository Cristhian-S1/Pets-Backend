import * as ModelosAuth from "../models/auth.model.js";
import jwt from "jsonwebtoken";

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

/*

Esta seccion tiene que ir aparte para que el backend sepa que el tipo esta logeado.
Si queremos proteger ciertas rutas para usuarios logeados seria algo como
petsRouter.post("/publicar", verificarToken, crearPublicacion);

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // formato: Bearer xxx

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JTW_KEY);
    req.user = decoded; // ← aquí guardamos la info del usuario
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
*/

//export const register = async (req, res) => {};
