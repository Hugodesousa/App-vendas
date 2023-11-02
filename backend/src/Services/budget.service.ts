import { MyNewError } from "../err/GenericError";
import IProducts from "../Interfaces/IProducts";
import IUsers from "../Interfaces/IUsers";
import MockEnd from "../db/MockEnd";

class BudgetService {
  private mockEnd: MockEnd;
  private productList: IProducts[];
  private userId: number;
  private productIdList: number[];
  private user: IUsers[];

  constructor(userId: number, productsIdList: number[]) {

    this.mockEnd = new MockEnd();
    this.productIdList = productsIdList;
    this.userId = userId;
    this.productList = [];
    this.user = [];
  }

  private async getUser(): Promise<Error | void> {
    const getUser = await this.mockEnd.findUser(this.userId);
    if (getUser.length === 0) {
      throw new MyNewError(404, 'User Not Found')
    }
    this.user.push(getUser[0]);
  }

  private async getProducts(): Promise<void | Error> {
    const allProducts = await this.mockEnd.findAllProducts();

    this.productIdList.forEach((productId) => {
      const product = allProducts
        .find(product => product.id === productId);
      if (!product) {
        throw new MyNewError(404, 'Product Not Found');
      }
      this.productList.push(product);
    });

  }

  public async calculateBudget(): Promise<string> {

    await this.getProducts();
    await this.getUser();

    const myUser = this.user[0];
    let value = 0;

    this.productList.forEach((product) => {
      value += product.price;
    })

    const budget = (value / 100) * myUser.tax
    return budget.toFixed(2);
  }
}

export default BudgetService;