import { Router, NextFunction, Request, Response } from 'express';
import checkRequest from '../middleware/checkRequest';
import VendaController from '../Controllers/venda.controller';
const vendasRoutes = Router();

vendasRoutes.post('/venda/cadastrar',(
  req: Request,
  res: Response,
  next: NextFunction,
) => new VendaController(req, res, next).cadastrarVenda());

export default vendasRoutes;