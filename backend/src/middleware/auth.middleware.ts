import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../jwt/config';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).send({ message: 'Token não fornecido' });

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.status(403).send({ message: 'Falha na autenticação do token' });

    // Adiciona o ID do usuário autenticado ao objeto de solicitação
    req.body.authUserId = (user as any).userId;

    next();
  });
}
