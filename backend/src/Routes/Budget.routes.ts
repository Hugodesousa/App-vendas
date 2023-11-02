import { Router, NextFunction, Request, Response } from 'express';
import BudgetController from '../Controllers/budget.controller';
import checkRequest from '../middleware/checkRequest';
const budgetRoutes = Router();

budgetRoutes.get('/budget/:id', checkRequest,(
  req: Request,
  res: Response,
  next: NextFunction,
) => new BudgetController(req, res, next).calculateBudget())

export default budgetRoutes;