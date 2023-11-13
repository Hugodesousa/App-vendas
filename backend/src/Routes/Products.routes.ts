import { Router, NextFunction, Request, Response } from 'express';
import ProductsController from '../Controllers/products.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const productsRoutes = Router();

productsRoutes.get('/products/list', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).todosProdutos());

productsRoutes.get('/products/list/categorias', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtosCategorias());

productsRoutes.get('/products/list/fornecedores', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtosFornecedores());

productsRoutes.get('/products/list/id', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).produtoPorId());

productsRoutes.post('/produtos/InserirProduto', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).inserirProduto());

productsRoutes.put('/products/edit', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).editarProdutos());

productsRoutes.delete('/products/delete', authenticateToken,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new ProductsController(req, res, next).deletarProdutos());

export default productsRoutes;