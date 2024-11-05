import { Response } from "express";
import IUsers from "../Interfaces/IUsers";
import { db } from '../db/connect';

class UsersService {
 private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  public async findAllUsers(): Promise<IUsers[] | void> {
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
db.all(sql, (selectErr, rows) => {
  // if (selectErr) {
  //   console.error('Erro ao executar a consulta SELECT', selectErr.message);
  //   return this.res.status(500).send(selectErr.message);
  // } else {
    return rows;
  // }
});
  }
}

export default UsersService;