import { useEffect, useState } from "react";
import { Table, Td, ThHeader, TrHeader, Tr, StyledLink } from "./styles";

export function TabelaProdutos() {
  type Produto = {
    pk_produtos_unidade_id: number;
    codigo_fabrica: string;
    produto_nome: string;
    descricao: string;
    quantidade_estoque: number;
    preco_custo: number;
    preco_venda: number;
    fk_produto_categoria: string;
    data_cadastro: string;
    data_fabricacao: string | null;
    data_validade: string | null;
    fk_fornecedor_id: number;
    fk_promocao: number;
    pk_categoria_id: number;
    categoria_nome: string;
  }

  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/products/list';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProdutos(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <Table>
      <thead>
        <TrHeader>
          <ThHeader>Código de Fábrica</ThHeader>
          <ThHeader>Nome do Produto</ThHeader>
          <ThHeader>Descrição</ThHeader>
          <ThHeader>Quantidade em Estoque</ThHeader>
          <ThHeader>Preço de Custo</ThHeader>
          <ThHeader>Preço de Venda</ThHeader>
          <ThHeader>Categoria</ThHeader>
          <ThHeader>Data de Cadastro</ThHeader>
        </TrHeader>
      </thead>
      <tbody>
        {produtos.map((produto, index) => (
          <Tr key={index}>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.codigo_fabrica}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.produto_nome}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.descricao}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.quantidade_estoque}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.preco_custo}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.preco_venda}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.categoria_nome}</p>
              </StyledLink>
            </Td>
            <Td>
              <StyledLink to={`/caminho-do-produto/${produto.pk_produtos_unidade_id}`}>
                <p>{produto.data_cadastro}</p>
              </StyledLink>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
