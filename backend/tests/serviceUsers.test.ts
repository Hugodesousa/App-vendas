import { expect } from 'chai';
import Sinon from 'sinon';
import IUsers from "../src/Interfaces/IUsers";
import UsersService from '../src/Services/users.service';

describe('Testa todos os serviços da camada "user.service"', function () {
  it('Testa se o método "findAllUsers" na camada de serviço retorna uma lista de usuários', async function () {
    const user: IUsers = {
      id: 2,
      name: 'testeName',
      tax: 50,
    };

    const listUser: IUsers[] = [user]
    const userService = new UsersService()
    Sinon.stub(userService, 'findAllUsers').resolves(listUser)
    const getUsers = await userService.findAllUsers();
    expect(getUsers).to.be.deep.equal(listUser);

  })
});