import { expect } from 'chai';
import budgetService from '../src/Services/budget.service';

describe('Testa O calculo de orçamento', function () {
  it('Testa se a função retorna os alores corretos', async function () {

    // Sinon.stub(budget['mockEnd'], 'findProduct').callsFake(() => {
    //   return Promise.resolve([{ id: 1, name: 'dfsdfdsfd', price: 1000 }, { id: 2, name: 'dfsdfdsfd', price: 2000 }]);
    // });
    // Sinon.stub(budget['mockEnd'], 'findUser').callsFake(() => {
    //   return Promise.resolve([{ id: 1, name: 'dfsdfdsfd', tax: 100 }]);
    // });
        
    const budget = new budgetService(1, [1, 2]);
    const calculate = await budget.calculateBudget(); 
    expect(calculate).to.be.equal('7410.20');
    
  });
  it('Testa se um erro e lançado quando usuario não e encontrado', async function () {
    const budget = new budgetService(101, [1, 2]);
    try {
      await budget.calculateBudget();
    } catch (error: any) { 
      expect(error.status).to.be.equal(404);
      expect(error.message).to.be.equal("User Not Found");
    }
  });
  it('Testa se um erro e lançado quando um produto não e encontrado', async function () {
    const budget = new budgetService(10, [1, 200]);
    try {
      await budget.calculateBudget();
    } catch (error: any) {
      expect(error.status).to.be.equal(404);
      expect(error.message).to.be.equal("Product Not Found");
    }
  });
});