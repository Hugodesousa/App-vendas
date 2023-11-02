import { NextFunction, Request, Response } from 'express';
import BudgetService from '../Services/budget.service';
import Controller from './controller';

class BudgetController extends Controller {
  private budgetService: BudgetService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    const id = Number(this.req.params.id);
    const productList = this.req.query.productList as string;
    const myProductList = productList.split(",").map(Number);
    this.budgetService = new BudgetService(id, myProductList);
  }

  public async calculateBudget() {
    try {
      const budget: string = await this.budgetService.calculateBudget();
      return this.res.status(200).json({ valorTotal: budget });
    } catch (error) {
      this.next(error)
    }
  }

}

export default BudgetController;