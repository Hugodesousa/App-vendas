import { Router, NextFunction, Request, Response } from 'express';
import ProductsController from '../Controllers/products.controller';

const productsRoutes = Router();

productsRoutes.get('/products/list', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).findAllProducts())

export default productsRoutes;