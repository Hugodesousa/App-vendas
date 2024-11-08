import { NextFunction, Request, Response } from 'express';
import ProductsService from '../Services/products.service';
import Controller from './controller';
import { db } from '../db/connect';
import QueryString from 'qs';

class ProductsController extends Controller {
  private productsService: ProductsService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)
    this.productsService = new ProductsService();
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
  
  public async produtoPorId() {
    const sqlProdutoPorId = `SELECT * FROM  produtos_unidade pu where pk_produtos_unidade_id = ?`

    
    const produtoId = this.req.query.produtoId;

    if (produtoId) {
      const paramsProdutoPorId = [produtoId];

      this.runQuerySelect(sqlProdutoPorId, paramsProdutoPorId)
        .then(rows => this.res.status(200).json(rows))
        .catch(error => this.res.status(500).send(error));
    }

    if (!produtoId) {
      return this.res.status(500).send({ message: 'Produto invalido' });
    }

  }

  public async todosProdutos() {
    const sqlTodosProdutos = `
    SELECT
      pk_produtos_unidade_id,
      pu.codigo_fabrica,
      pu.produto_nome,
      pu.descricao,
      pu.quantidade_estoque,
      pu.preco_custo,
      pu.preco_venda,
      pu.fk_produto_categoria,
      pu.data_cadastro,
      pu.data_fabricacao,
      pu.data_validade,
      pu.fk_fornecedor_id,
      pu.fk_promocao,
      cp.pk_categoria_id,
      cp.nome as categoria_nome
    FROM produtos_unidade as pu inner join categorias_produto cp on
	    cp.pk_categoria_id = pu.fk_produto_categoria
    order by pu.produto_nome;`;

    try {

      const todosProdutos = await this.runQuerySelect(sqlTodosProdutos, [])
      return this.res.status(200).json(todosProdutos);
    } catch (error) {
      return this.res.status(500).send(error);
      // this.next(error)
    }
  }

  public async produtosFornecedores() {
    const sqlFornecedores = `SELECT * FROM fornecedores WHERE status_ativo = 1;`;

    try {

      const todosProdutos = await this.runQuerySelect(sqlFornecedores, [])
      return this.res.status(200).json(todosProdutos);
    } catch (error) {
      return this.res.status(500).send(error);
      // this.next(error)
    }
  }

  public async produtosCategorias() {
    const sqlCategorias = `SELECT * FROM categorias_produto;`;

    try {

      const todosProdutos = await this.runQuerySelect(sqlCategorias, [])
      return this.res.status(200).json(todosProdutos);
    } catch (error) {
      return this.res.status(500).send(error);
      // this.next(error)
    }
  }

  public async inserirProduto() {
    console.log(this.req.body);
    const {
      codigo_fabrica,
      produto_nome,
      descricao,
      quantidade_estoque,
      preco_custo,
      preco_venda,
      fk_produto_categoria,
      fk_fornecedor_id,
      fk_promocao
    } = this.req.body;

    if (
      !codigo_fabrica ||
      !produto_nome ||
      !descricao ||
      quantidade_estoque === undefined ||
      preco_custo === undefined ||
      preco_venda === undefined ||
      !fk_produto_categoria ||
      !fk_fornecedor_id ||
      fk_promocao === undefined
    ) {
      return this.res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    try {
      const inserirProdutoSQL = `INSERT INTO produtos_unidade
      ( codigo_fabrica,
        produto_nome, 
        descricao, 
        quantidade_estoque,
        preco_custo, 
        preco_venda, 
        fk_produto_categoria, 
        data_cadastro, 
        fk_fornecedor_id, 
        fk_promocao, 
        produto_ativo)
      VALUES( ?, ?, ?, ?, ?, ?, ?, date('now'), ?, 0, 1);`

      const inserirProdutoParams = [
        codigo_fabrica,
        produto_nome,
        descricao,
        quantidade_estoque,
        preco_custo,
        preco_venda,
        fk_produto_categoria,
        fk_fornecedor_id]


      await this.runQueryInsert(inserirProdutoSQL,inserirProdutoParams)
      this.res.status(200).json({ message: 'Novo produto cadastrado' });
    } catch (error) {
      this.res.status(500).send(error);
    }
  }


  public async editarProdutos() {
    
    const {
      codigo_fabrica,
      produto_nome,
      descricao,
      quantidade_estoque,
      preco_custo,
      preco_venda,
      fk_produto_categoria,
      fk_fornecedor_id,
      produtoId,
      pk_produtos_unidade_id
    } = this.req.body;

    
    try {
      
      if (codigo_fabrica &&
        produto_nome &&
        descricao &&
        quantidade_estoque &&
        preco_custo &&
        preco_venda &&
        fk_produto_categoria &&
        fk_fornecedor_id &&
        produtoId &&  pk_produtos_unidade_id) {
          console.log(this.req.body);
          
          const sqlEditarProduto = `
            UPDATE produtos_unidade
            SET 
              codigo_fabrica=?, 
              produto_nome =?, 
              descricao=?, 
              quantidade_estoque=?, 
              preco_custo=?, 
              preco_venda=?, 
              fk_produto_categoria=?, 
              data_cadastro=DATE('now') , 
              data_fabricacao=null, 
              data_validade=null, 
              fk_fornecedor_id=?, 
              fk_promocao=0, 
              produto_ativo=1
            WHERE pk_produtos_unidade_id= ?;
          `;

          const paramsEditarProduto = [
            codigo_fabrica,
            produto_nome,
            descricao,
            quantidade_estoque,
            preco_custo,
            preco_venda,
            fk_produto_categoria,
            fk_fornecedor_id,
            produtoId
          ];

          await this.runQueryUpdate(sqlEditarProduto, paramsEditarProduto);
      }

      this.res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
      this.res.status(500).send(error);
    }

  }

  public async deletarProdutos() {
    const { produtoId } = this.req.body;

    try {
      if (produtoId) {
        const sqlDeletarContatos = `DELETE FROM produtos_unidade WHERE pk_produtos_unidade_id=?;`;
        await this.runQueryDelete(sqlDeletarContatos, [produtoId]);
        this.res.status(200).json({ message: 'Produto deletado com sucesso' });
      } else {
        this.res.status(400).json({ message: 'ID do produto não fornecido' });
      }
    } catch (error) {
      this.res.status(500).send(error);
    }
  }
}

export default ProductsController;