import IProducts from "../Interfaces/IProducts";
import MockEnd from "../MockEnd/MockEnd";

class ProductsService {
  private mockEnd: MockEnd;

  constructor() {
    this.mockEnd = new MockEnd()
  }

  public async findAllProducts(): Promise<IProducts[] | void> {
    const productsList = await this.mockEnd.findAllProducts();
    return productsList as IProducts[];
  }
}

export default ProductsService;