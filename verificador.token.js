import jwt from "jsonwebtoken";

//Verificar sesion mediante el token
export function verificarToken(req, res, next) {
  const header = req.header("Authorization") || "";

  //Este split alucin es porque el header tiene Bearer eyJhbG.... y el resto del token, por tanto, ["Bearer", "eyJhbG..."]
  const token = header.split(" ")[1];
  console.log("request y su contenido", req);
  console.log("Este es el header: ", header);
  console.log("Este es el token: ", token);
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
