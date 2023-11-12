import { NextFunction, Request, Response } from 'express';
// import VendaService from '../Services/budget.service';
import Controller from './controller';
import { db } from '../db/connect';
import QueryString from 'qs';
import { log } from 'console';

interface Produto {
  pk_produtos_unidade_id: number;
  codigo_fabrica: null | string;
  categoria_nome: string;
  data_cadastro: string;
  data_fabricacao: null | string;
  data_validade: null | string;
  descricao: string;
  fk_fornecedor_id: number;
  fk_produto_categoria: string;
  fk_promocao: null | string;
  pk_categoria_id: number;
  preco_custo: number;
  preco_venda: number;
  produto_nome: string;
  quantidade_estoque: null | number;
}

class VendaController extends Controller {


  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next)

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

  public async cadastrarVenda() {
    
    try {

      const { vendedorId, clienteId, total, itens } = this.req.body;
      // console.log('antes o cao',this.req.body);
      
      let vendaId: number;
      if (vendedorId && clienteId && Array.isArray(itens)) {
        const sqlInserirVenda = `INSERT INTO vendas_compra
        (data_venda, 
        fk_cliente_id, 
        fk_vendedor_id, 
        total_venda, 
        fk_condicao_pagamento_id, 
        fk_status_venda_compra_id)
        VALUES(DATE('now'), ?, ?, null, 1, 1);`;
        const paramsInserirVenda = [clienteId,vendedorId]
        const resultVenda = await this.runQueryInsert(sqlInserirVenda,paramsInserirVenda)
        vendaId = Number(resultVenda.insertId);
        
        const sqlInserirItens = `INSERT INTO vendas_compra_itens
        (fk_item_id, qnt, fk_compra_venda)
        VALUES(?, 1, ?);`;

        itens.forEach(async (item) => {
          console.log(item);
          
          const paramsInseriritem = [item.pk_produtos_unidade_id,vendaId];
          await this.runQueryInsert(sqlInserirItens,paramsInseriritem)
        })
      }


      // console.log('cao-->', vendaId);
      
      return this.res.status(200).json({ });
    } catch (error) {
      this.next(error)
    }
  }

}

export default VendaController;