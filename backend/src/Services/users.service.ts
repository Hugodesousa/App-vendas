import IUsers from "../Interfaces/IUsers";
import MockEnd from "../MockEnd/MockEnd";

class UsersService {
  private mockEnd: MockEnd;

  constructor() {
    this.mockEnd = new MockEnd()
  }

  public async findAllUsers(): Promise<IUsers[] | void> {
    const usersList = await this.mockEnd.findAllUsers();
    return usersList as IUsers[];
  }
}

export default UsersService;