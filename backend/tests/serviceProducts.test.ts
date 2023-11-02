import { expect } from 'chai';
import Sinon from 'sinon';
import IProducts from '../src/Interfaces/IProducts';
import ProductsService from '../src/Services/products.service';

describe('Testa todos os serviços da camada "products.service"', function () {
  it('Testa se o método "findAllProducts" na camada de serviço retorna uma lista de produtos', async function () {
    const products: IProducts[] = [{
      id: 2,
      name: 'testeName',
      price: 5000,
    },
    {
      id: 1,
      name: 'testeName2',
      price: 4000,
    }];

    const productsService = new ProductsService()
    Sinon.stub(productsService, 'findAllProducts').resolves(products)
    const getProducts = await productsService.findAllProducts();
    expect(getProducts).to.be.deep.equal(products);
  })
});