import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token de autenticação inválido." });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ message: "Token de autenticação mal formatado." });
  }
  
  const secret = process.env.JWT_PASS || "supersecretpassword";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token de autenticação inválido." });
    }

    res.locals.user = decoded;

    return next();
  });
}

export default authMiddleware;
