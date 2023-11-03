import { Router, NextFunction, Request, Response } from 'express';
import usersController from '../Controllers/users.controller';


const userRoutes = Router();


userRoutes.get('/users/list', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).findAllUsers());

userRoutes.get('/users/list/id', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).findUser());

userRoutes.put('/users/edit', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).editUsers());

userRoutes.get('/users/usuariosTipo', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).usuariosTipo());

userRoutes.post('/users/InserirUsuario', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).inserirUsuarios());

export default userRoutes;