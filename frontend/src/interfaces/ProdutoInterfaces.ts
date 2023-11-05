export interface IProduto {
  codigo_fabrica: string;
  produto_nome: string;
  descricao: string;
  quantidade_estoque: number;
  preco_custo: number;
  preco_venda: number;
  fk_produto_categoria: string;
  data_cadastro: string;
  data_fabricacao: string;
  data_validade: string;
  fk_fornecedor_id: string;
  fk_promocao: number;
  }
  