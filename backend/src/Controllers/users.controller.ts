import { NextFunction, Request, Response } from 'express';
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
    e.complemento,
    e.end_completo,
    c.ddd, 
    c.telefone as tel,
    c.ddd || c.telefone as telefone,
    c.pk_contato_id
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut ON u.fk_user_tipo_id = ut.pk_user_tipo_id
    INNER JOIN endereco as e ON e.pk_endereco_id = u.fk_endereco_id
    LEFT JOIN contatos as c ON u.pk_user_id = c.fk_user_id
    where u.pk_user_id = ?;
    `;


    const user = this.req.query.userId || null;


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


  private update(sql: string, params: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs)[]) {
    return new Promise<void>((resolve, reject) => {
        db.run(sql, params, (updateErr) => {
            if (updateErr) {
                console.error('Erro ao executar a update --->', updateErr.message);
                reject(updateErr.message);
            } else {
                resolve();
            }
        });
    });
}

public async editUsers() {
    console.log(this.req.body);

    const sqlNomeEemail = `
        UPDATE usuarios
        SET user_nome = ?, user_email = ?
        WHERE pk_user_id = ?;
    `;
  
    const sqlEndereco = `
        UPDATE endereco
        SET
            logradouro = ?,
            pais = ?,
            cep = ?,
            estado = ?,
            cidade = ?,
            bairro = ?,
            numero = ?,
            complemento = ?,
            end_completo = ?
        WHERE pk_endereco_id = (
            SELECT fk_endereco_id FROM usuarios WHERE pk_user_id = ?
        );
    `;

    const { novoNome, novoEmail, userId, logradouro, pais, cep, estado, cidade, bairro, numero, complemento, endCompleto } = this.req.body;

    if (novoNome && userId && novoEmail) {
        const paramsNomeEemail = [novoNome, novoEmail, userId];
        try {
            await this.update(sqlNomeEemail, paramsNomeEemail);

            // Atualização do endereço
            if (logradouro && pais && cep && estado && cidade && bairro && numero && complemento && endCompleto) {
                const paramsEndereco = [logradouro, pais, cep, estado, cidade, bairro, numero, complemento, endCompleto, userId];
                await this.update(sqlEndereco, paramsEndereco);
                this.res.status(200).json({ message: 'Usuário atualizado com sucesso' });
            }
        } catch (error) {
            this.res.status(500).send(error);
        }
    } 
}


  

}

export default UsersController;
