import jwt from "jsonwebtoken";

//Verificar sesion mediante el token
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        cod: 401,
        msj: "Token no proporcionado",
        datos: null,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);

    // 👇 ESTO ES LO QUE FALTABA / FALLABA
    req.usuario = decoded;

    return next();
  } catch (error) {
    return res.status(403).json({
      cod: 403,
      msj: "Token no valido",
      datos: null,
    });
  }
};

