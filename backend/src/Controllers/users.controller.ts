import { NextFunction, Request, Response } from 'express';
import UsersService from '../Services/users.service';
import Controller from './controller';
import { db } from '../db/connect';
import QueryString from 'qs';
import jwt from 'jsonwebtoken';
import config from '../jwt/config';

type UsuarioLogin = {
  pk_user_id: number;
  user_nome: string;
  user_email: string;
  user_str_login: string;
  data_cadastro: string;
  user_senha: string;
  tipo_usuario: 'ADMIN' | 'OUTRO_TIPO'; // Substitua 'OUTRO_TIPO' pelo outro tipo, se aplicável
};

class UsersController extends Controller {
  private usersService: UsersService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.usersService = new UsersService(res);
  }



  private generateToken(username: string, password: string): string {
    return jwt.sign({ username, password }, config.secret, { expiresIn: config.expiresIn });
  }


  public async login() {

    const { username, password } = this.req.body;

    if (username && password) {
      const user = await this.usuarioPorStrNome(username);
      console.log('--->>>>', user);


      if (user.user_senha === password) {

        try {

          const { user_senha, ...userWithoutPassword } = user;
          const token = this.generateToken(username, user_senha);
          this.res.status(200).json({ token, ...userWithoutPassword });

        } catch (error) {

          this.res.status(500).send(error);

        }

      }

      if (user.user_senha !== password) {

        this.res.status(500).send('Senha incorreta');

      }
    }
  }

  //-------------------------Parte que lida com o db, tirar daqui depois. -----------------------------

  private runQuerySelect(sql: string, params: (string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[])[]): Promise<any> {
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

  private runQueryUpdate(sql: string, params: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs)[]) {
    return new Promise<void>((resolve, reject) => {
      db.run(sql, params, (updateErr) => {
        if (updateErr) {
          console.error('Erro ao executar o update --->', updateErr.message);
          reject(updateErr.message);
        } else {
          resolve();
        }
      });
    });
  }

  private runQueryInsert(sql: string, params: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs)[]): Promise<any> {
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

  private runQueryDelete(sql: string, params: (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs)[]): Promise<any> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          console.error('Erro ao executar o delete:', err.message);
          reject(err.message);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }


  //----------------------------------------------------------------------------------------------------------------------- -----------------------------
  public usuariosTipo() {
    const sql = 'SELECT pk_user_tipo_id, tipo_usuario FROM usuarios_tipo;';

    this.runQuerySelect(sql, [])
      .then(rows => this.res.status(200).json(rows))
      .catch(error => this.res.status(500).send(error));

  }

  public async usuarioPorStrNome(strNome: string) {
    console.log('-----------------------------');

    const sql = `
    SELECT 
    u.pk_user_id,
    u.user_nome,
    u.user_email,
    u.user_str_login,
    u.data_cadastro,
    u.user_senha,
    ut.tipo_usuario
    FROM usuarios as u
    INNER JOIN usuarios_tipo as ut ON u.fk_user_tipo_id = ut.pk_user_tipo_id
    where u.user_str_login = ?;
    `;

    const params = [strNome];

    const result = await this.runQuerySelect(sql, params)
      .then(rows => rows[0])
      .catch(error => error);
    return result as unknown as UsuarioLogin;
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

      this.runQuerySelect(sql, params)
        .then(rows => this.res.status(200).json(rows))
        .catch(error => this.res.status(500).send(error));
    }

    if (!user) {
      return this.res.status(500).send({ message: 'Usuario invalido' });
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
        await this.runQueryUpdate(sqlNomeEemail, paramsNomeEemail);
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
        await this.runQueryUpdate(sqlEndereco, paramsEndereco);
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
          await this.runQueryUpdate(sqlContato, paramsContato);
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
      tipoUser
    } = this.req.body;

    try {
      if (novoNome && novoEmail && tipoUser) {
        console.log('ttt', tipoUser);

        const sqlNovoUsuario = `
          INSERT INTO usuarios (user_nome, user_email, data_cadastro, fk_user_tipo_id, user_ativo)
          VALUES (?, ?, date('now'), ?, 1);
        `;
        const paramsNovoUsuario = [novoNome, novoEmail, tipoUser];
        const resultUsuario = await this.runQueryInsert(sqlNovoUsuario, paramsNovoUsuario);

        const userId = resultUsuario.insertId;


        if (logradouro && pais && cep && estado && cidade && bairro && numero && complemento && endCompleto) {
          const sqlEndereco = `
            INSERT INTO endereco (logradouro, pais, cep, estado, cidade, bairro, numero, complemento, end_completo, data_cadastro, ativo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, date('now'), 1);
          `;
          const paramsEndereco = [logradouro, pais, cep, estado, cidade, bairro, numero, complemento, endCompleto];
          const resultEndereco = await this.runQueryInsert(sqlEndereco, paramsEndereco);

          const enderecoId = resultEndereco.insertId;

          const sqlUpdateUsuario = `
            UPDATE usuarios
            SET fk_endereco_id = ?
            WHERE pk_user_id = ?;
          `;
          const paramsUpdateUsuario = [enderecoId, userId];
          await this.runQueryUpdate(sqlUpdateUsuario, paramsUpdateUsuario);
        }

        if (novosContatos && novosContatos.length > 0) {
          for (const contato of novosContatos) {
            const { tel, ddd } = contato;
            const sqlContato = `
              INSERT INTO contatos (telefone, ddi, ddd, fk_user_id, data_cadastro, ativo)
              VALUES (?,55, ?, ?, date('now'), 1);
            `;
            const paramsContato = [tel, ddd, userId];
            await this.runQueryInsert(sqlContato, paramsContato);
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


  public async deletarUsuario() {
    const { userId } = this.req.body;

    try {
      if (userId) {
        // Deletar os telefones associados ao usuário
        const sqlDeletarContatos = `DELETE FROM contatos WHERE fk_user_id = ?`;
        await this.runQueryDelete(sqlDeletarContatos, [userId]);

        // Obter o ID do endereço associado ao usuário
        const sqlBuscarEndereco = `SELECT fk_endereco_id FROM usuarios WHERE pk_user_id = ?`;
        const resultEndereco = await this.runQuerySelect(sqlBuscarEndereco, [userId]);
        const enderecoId = resultEndereco[0].fk_endereco_id;

        if (enderecoId) {
          // Deletar o endereço associado ao usuário
          const sqlDeletarEndereco = `DELETE FROM endereco WHERE pk_endereco_id = ?`;
          await this.runQueryDelete(sqlDeletarEndereco, [enderecoId]);
        }

        // Deletar o usuário
        const sqlDeletarUsuario = `DELETE FROM usuarios WHERE pk_user_id = ?`;
        await this.runQueryDelete(sqlDeletarUsuario, [userId]);

        this.res.status(200).json({ message: 'Usuário deletado com sucesso' });
      } else {
        this.res.status(400).json({ message: 'ID do usuário não fornecido' });
      }
    } catch (error) {
      this.res.status(500).send(error);
    }
  }
}

export default UsersController;
