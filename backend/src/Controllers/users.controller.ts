import { NextFunction, Request, Response } from 'express';
import IUsers from '../Interfaces/IUsers';
import UsersService from '../Services/users.service';
import Controller from './controller';
import { db } from '../db/connect';

class UsersController extends Controller {
  private usersService: UsersService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.usersService = new UsersService();
  }

  public async findAllUsers() {
    const sql = `SELECT
    user_nome,
    user_email,
    u.data_cadastro,
    ut.tipo_usuario,
    e.end_completo,
    c.ddd || c.telefone as telefone
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut on u.fk_user_tipo_id = ut.pk_user_tipo_id
    INNER JOIN endereco as e on e.pk_endereco_id = u.fk_endereco_id
    inner join contatos as c on u.pk_user_id = c.fk_user_id;`

    try {
      db.all(sql, (selectErr, rows) => {
        if (selectErr) {
          console.error('Erro ao executar a consulta SELECT', selectErr.message);
          return this.res.status(500).send('Erro na consulta.');
        } else {
          return this.res.status(200).json(rows);
        }
      });
      //const allUsers: void | IUsers[] = await this.usersService.findAllUsers();
      // return this.res.status(200).json(allUsers);
      // return this.res.status(200).json([{nome:"hugo"},{nome:"teste"}]);
    } catch (error) {
      this.next(error)
    }
  }
}

export default UsersController;
