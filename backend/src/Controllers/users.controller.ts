import { NextFunction, Request, Response } from 'express';
import IUsers from '../Interfaces/IUsers';
import UsersService from '../Services/users.service';
import Controller from './controller';
import { db } from '../db/connect';
import QueryString from 'qs';

class UsersController extends Controller {
  private usersService: UsersService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.usersService = new UsersService(res);
  }


  public findUser() {
    const sql = `
    SELECT 
    u.pk_user_id,
    u.user_nome,
    u.user_email,
    u.data_cadastro,
    ut.tipo_usuario,
    e.end_completo,
    e.logradouro,
    e.pais,
    e.cep,
    e.estado, 
    e.cidade,
    e.bairro,
    e.numero, 
    e.end_completo,
    c.ddd || c.telefone as telefone
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut ON u.fk_user_tipo_id = ut.pk_user_tipo_id
    INNER JOIN endereco as e ON e.pk_endereco_id = u.fk_endereco_id
    LEFT JOIN contatos as c ON u.pk_user_id = c.fk_user_id
    where u.pk_user_id = ?;
    `;

    // const novoNome = this.req.query.novoNome || null;
    const user = this.req.query.userId || null;
    // console.log(this.req.query);

    if ( user) {
      const params = [user];

      db.all(sql, params, (selectErr, rows) => {
        if (selectErr) {
          console.error('Erro ao executar a consulta --->', selectErr.message);
          return this.res.status(500).send(selectErr.message);
        } else {
          return this.res.status(200).json(rows);
        }
      });

    }

    if (!user) {
      return this.res.status(500).send({ message: 'Nome ou usuario invalido' });
    }
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
      c_recente.ddd || c_recente.telefone as telefone
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut ON u.fk_user_tipo_id = ut.pk_user_tipo_id
    INNER JOIN endereco as e ON e.pk_endereco_id = u.fk_endereco_id
    LEFT JOIN (
      SELECT fk_user_id, ddd, telefone
      FROM contatos 
      WHERE (fk_user_id, data_cadastro) IN (
        SELECT fk_user_id, MAX(data_cadastro) 
        FROM contatos 
        GROUP BY fk_user_id
      )
    ) AS c_recente ON u.pk_user_id = c_recente.fk_user_id;`;

    try {
      db.all(sql, (selectErr, rows) => {
        if (selectErr) {
          console.error('Erro ao executar a consulta --->', selectErr.message);
          return this.res.status(500).send(selectErr.message);
        } else {
          return this.res.status(200).json(rows);
        }
      });

    } catch (error) {
      this.next(error)
    }
  }


  private update(sql:string, params:(string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[])[], res: Response) {
    db.run(sql, params, (updateErr) => {
      if (updateErr) {
        console.error('Erro ao executar a update --->', updateErr.message);
        return res.status(500).send(updateErr.message);
      } else {
        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      }
    });
  }

  public editUsers() {
    const sqlNomeEemail = `
    UPDATE usuarios
    SET user_nome = ?, user_email = ?
    WHERE pk_user_id = ?;
    `;

    // const novoNome = this.req.query.novoNome || null;
    // const novoEmail = this.req.query.novoEmail || null;
    // const user = this.req.query.userId || null;
    // console.log('query--->',this.req.query);
    const { novoNome, novoEmail, userId } = this.req.body;

    if (novoNome && userId && novoEmail ) {
      const paramsNomeEemail = [novoNome, novoEmail, userId];
      this.update(sqlNomeEemail,paramsNomeEemail,this.res)
    }




    if (!novoNome || !userId || !novoEmail ) {
      return this.res.status(500).send({ message: 'Nome, emil ou usuario invalido' });
    }
    
  }

}

export default UsersController;
