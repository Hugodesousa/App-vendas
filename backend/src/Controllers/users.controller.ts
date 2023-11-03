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

  public usuariosTipo() {
    const sql = 'SELECT pk_user_tipo_id, tipo_usuario FROM usuarios_tipo;';

    this.runQueryWithParams(sql, [])
      .then(rows => this.res.status(200).json(rows))
      .catch(error => this.res.status(500).send(error));

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

    if (user) {
      const params = [user];

      this.runQueryWithParams(sql, params)
        .then(rows => this.res.status(200).json(rows))
        .catch(error => this.res.status(500).send(error));
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

  private runQueryWithParams(sql: string, params: (string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[])[]): Promise<any> {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Erro ao executar a consulta --->', err.message);
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
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

  private insert(sql: string, params: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs)[]): Promise<any> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          console.error('Erro ao executar o insert:', err.message);
          reject(err.message);
        } else {
          resolve({ insertId: this.lastID });
        }
      });
    });
  }

  public async editUsers() {
    // console.log('query==>', this.req.body);
    const {
      novoNome,
      novoEmail,
      userId,
      logradouro,
      pais,
      cep,
      estado,
      cidade,
      bairro,
      numero,
      complemento,
      endCompleto,
      novosContatos,
    } = this.req.body;

    try {
      if (novoNome && userId && novoEmail) {
        const sqlNomeEemail = `
        UPDATE usuarios
        SET user_nome = ?, user_email = ?
        WHERE pk_user_id = ?;
      `;
        const paramsNomeEemail = [novoNome, novoEmail, userId];
        await this.update(sqlNomeEemail, paramsNomeEemail);
      }

      if (logradouro && pais && cep && estado && cidade && bairro && numero && complemento && endCompleto) {
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
        const paramsEndereco = [logradouro, pais, cep, estado, cidade, bairro, numero, complemento, endCompleto, userId];
        await this.update(sqlEndereco, paramsEndereco);
      }

      if (novosContatos && novosContatos.length > 0) {
        for (const contato of novosContatos) {
          const { pk_contato_id, tel, ddd } = contato;
          const sqlContato = `
          UPDATE contatos
          SET ddd = ?, telefone = ?
          WHERE pk_contato_id = ?;
        `;
          const paramsContato = [ddd, tel, pk_contato_id];
          await this.update(sqlContato, paramsContato);
        }
      }

      this.res.status(200).json({ message: 'Usuário atualizado com sucesso' });

    } catch (error) {
      this.res.status(500).send(error);
    }
  }

  public async inserirUsuarios() {
    const {
      novoNome,
      novoEmail,
      logradouro,
      pais,
      cep,
      estado,
      cidade,
      bairro,
      numero,
      complemento,
      endCompleto,
      novosContatos,
    } = this.req.body;

    try {
      if (novoNome && novoEmail) {
        // Inserir um novo usuário
        const sqlNovoUsuario = `
        INSERT INTO usuarios (user_nome, user_email)
        VALUES (?, ?);
      `;
        const paramsNovoUsuario = [novoNome, novoEmail];
        const resultUsuario = await this.insert(sqlNovoUsuario, paramsNovoUsuario);

        const userId = resultUsuario.insertId; // Obtém o ID do novo usuário inserido

        if (
          logradouro &&
          pais &&
          cep &&
          estado &&
          cidade &&
          bairro &&
          numero &&
          complemento &&
          endCompleto
        ) {
          // Inserir um novo endereço para o usuário
          const sqlEndereco = `
          INSERT INTO endereco (logradouro, pais, cep, estado, cidade, bairro, numero, complemento, end_completo)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
          const paramsEndereco = [logradouro, pais, cep, estado, cidade, bairro, numero, complemento, endCompleto];
          const resultEndereco = await this.insert(sqlEndereco, paramsEndereco);

          const enderecoId = resultEndereco.insertId; // Obtém o ID do novo endereço inserido

          // Atualizar o usuário com o ID do novo endereço
          const sqlUpdateUsuario = `
          UPDATE usuarios
          SET fk_endereco_id = ?
          WHERE pk_user_id = ?;
        `;
          const paramsUpdateUsuario = [enderecoId, userId];
          await this.update(sqlUpdateUsuario, paramsUpdateUsuario);
        }

        if (novosContatos && novosContatos.length > 0) {
          // Inserir novos contatos para o usuário
          for (const contato of novosContatos) {
            const { tel, ddd } = contato;
            const sqlContato = `
            INSERT INTO contatos (telefone, ddd, fk_user_id)
            VALUES (?, ?, ?);
          `;
            const paramsContato = [tel, ddd, userId];
            await this.insert(sqlContato, paramsContato);
          }
        }

        this.res.status(200).json({ message: 'Novo usuário inserido com sucesso' });
      } else {
        this.res.status(400).json({ message: 'Os campos obrigatórios estão faltando' });
      }
    } catch (error) {
      this.res.status(500).send(error);
    }
  }


}

export default UsersController;
