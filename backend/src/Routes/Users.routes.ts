import { Router, NextFunction, Request, Response } from 'express';
import usersController from '../Controllers/users.controller';

const userRoutes = Router();

userRoutes.get('/users/list', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new usersController(req, res, next).findAllUsers())

export default userRoutes;