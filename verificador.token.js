import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 1. MODO ESTRICTO (Para rutas protegidas: Dar Like, Crear Post)
export function verificarToken(req, res, next) {
  const header = req.header("Authorization") || "";
  
  // Si el header viene vacío o sin el formato correcto, evitamos errores
  if (!header.includes("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado o formato incorrecto" });
  }

  const token = header.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.id = payload.id;
    req.email = payload.email;
    next();
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(403).json({ message: "Token no valido" });
  }
}

// 2. MODO OPCIONAL (Para rutas públicas: Ver Feed)
export function verificarTokenOpcional(req, res, next) {
  const header = req.header("Authorization") || "";
  
  // Si no hay header o no tiene Bearer, es un invitado
  if (!header || !header.includes("Bearer ")) {
    req.id = null;
    return next();
  }

  const token = header.split(" ")[1];

  if (!token) {
    req.id = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.id = payload.id; // Usuario autenticado
    next();
  } catch (error) {
    // Si el token expiró, no bloqueamos, solo lo tratamos como invitado
    req.id = null; 
    next();
  }
}