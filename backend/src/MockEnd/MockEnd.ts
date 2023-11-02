import axios from 'axios';
import { MyNewError } from '../err/GenericError';
import IProducts from '../Interfaces/IProducts';
import IUsers from '../Interfaces/IUsers';

class MockEnd {
  private usersURL: string;
  private productsURL: string;

  constructor() {
    this.usersURL = 'https://mockend.com/juunegreiros/BE-test-api/users';
    this.productsURL = 'https://mockend.com/juunegreiros/BE-test-api/products';
  }

  private async funcAxios(url: string) {
    const req = await axios.get(url)
      .then((list) => {
        return list.data;
      })
      .catch(() => {
        throw new MyNewError(404, 'invalidURL');
      });
    return req;
  }

  public async findAllUsers(): Promise<IUsers[]> {
    const usersList = await this.funcAxios(this.usersURL)
    return usersList as IUsers[];
  }

  public async findAllProducts(): Promise<IProducts[]> {
    const productsList = await this.funcAxios(this.productsURL)
    return productsList as IProducts[];
  }

  public async findUser(userId: number): Promise<IUsers[]> {
    const user = await this.funcAxios(`${this.usersURL}?id_eq=${userId}`)
    return user as IUsers[];
  }

  public async findProduct(productId: number): Promise<IProducts[]> {
    const product = await this.funcAxios(`${this.productsURL}?id_eq=${productId}`)
    return product as IProducts[];
  }
}



export default MockEnd;