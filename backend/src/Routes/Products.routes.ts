import { Router, NextFunction, Request, Response } from 'express';
import ProductsController from '../Controllers/products.controller';

const productsRoutes = Router();

productsRoutes.get('/products/list', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).todosProdutos());

productsRoutes.get('/products/list/categorias', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtosCategorias());

productsRoutes.get('/products/list/fornecedores', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtosFornecedores());

productsRoutes.get('/products/list/id', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtoPorId());

productsRoutes.post('/produtos/InserirProduto', (
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).inserirProduto());

export default productsRoutes;