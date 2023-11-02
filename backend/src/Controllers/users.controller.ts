import { NextFunction, Request, Response } from 'express';
import IUsers from '../Interfaces/IUsers';
import UsersService from '../Services/users.service';
import Controller from './controller';
import { db } from '../db/connect';

class UsersController extends Controller {
  private usersService: UsersService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.usersService = new UsersService(res);
  }

  public async findAllUsers() {
    const sql = `
    SELECT 
      u.pk_user_id,
      u.user_nome,
      u.user_email,
      u.data_cadastro,
      ut.tipo_usuario,
      e.end_completo,
      c.ddd || c.telefone as telefone
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut ON u.fk_user_tipo_id = ut.pk_user_tipo_id
    INNER JOIN endereco as e ON e.pk_endereco_id = u.fk_endereco_id
    LEFT JOIN contatos as c ON u.pk_user_id = c.fk_user_id;
`
    try {
      db.all(sql, (selectErr, rows) => {
        if (selectErr) {
          console.error('Erro ao executar a consulta --->', selectErr.message);
          return this.res.status(500).send(selectErr.message);
        } else {
          return this.res.status(200).json(rows);
        }
      });


      // const users = this.usersService.findAllUsers()
      // return this.res.status(200).json(users);
      
    } catch (error) {
      this.next(error)
    }
  }
}

export default UsersController;
