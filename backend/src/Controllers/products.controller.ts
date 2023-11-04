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
          console.error('Erro ao executar a update --->', updateErr.message);
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
	    cp.pk_categoria_id = pu.fk_produto_categoria;`;

    try {
      
      const todosProdutos = await this.runQuerySelect(sqlTodosProdutos,[])
      return this.res.status(200).json(todosProdutos);
    } catch (error) {
      return this.res.status(500).send(error);
      // this.next(error)
    }
  }

}

export default ProductsController;