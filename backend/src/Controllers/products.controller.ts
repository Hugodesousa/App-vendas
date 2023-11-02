import { NextFunction, Request, Response } from 'express';
import IProducts from '../Interfaces/IProducts';
import ProductsService from '../Services/products.service';
import Controller from './controller';

class ProductsController extends Controller {
  private productsService: ProductsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.productsService = new ProductsService();
  }

  public async findAllProducts() {
    try {
      const allProducts: void | IProducts[] = await this.productsService.findAllProducts();
      return this.res.status(200).json(allProducts);
    } catch (error) {
      this.next(error)
    }
  }

}

export default ProductsController;