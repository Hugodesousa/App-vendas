import { Router, NextFunction, Request, Response } from 'express';
import usersController from '../Controllers/users.controller';
import { authenticateToken } from '../middleware/auth.middleware';


const userRoutes = Router();

userRoutes.post('/users/login', (
  req: Request, 
  res: Response, 
  next: NextFunction,
  ) => new usersController(req, res, next).login());

userRoutes.get('/users/list', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).findAllUsers());

userRoutes.get('/users/list/id', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).findUser());

userRoutes.put('/users/edit', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).editUsers());

userRoutes.get('/users/usuariosTipo', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).usuariosTipo());

userRoutes.post('/users/InserirUsuario', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).inserirUsuarios());

userRoutes.delete('/users/delete', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).deletarUsuario());

export default userRoutes;