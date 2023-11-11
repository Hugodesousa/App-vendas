import React, { useState, useEffect } from "react";
import { Container, Conteudo } from "../../../Home/styles";
import { MenuLateral } from "../../../MenuLateral";
import { Button, DivFinalizar, SystemVendas, Title } from "../CriarVenda/styles";
import { Link } from "react-router-dom";

// Importe os estilos necessários

export function FinalizarVenda() {
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

  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    const carrinhoAtualString = localStorage.getItem('carrinho');
    const carrinhoAtual: Produto[] = carrinhoAtualString ? JSON.parse(carrinhoAtualString) : [];
    setCarrinho(carrinhoAtual);
  }, []);

  const renderItensCarrinho = () => {
    return carrinho.map((produto) => (
      // Renderize aqui os elementos da lista que deseja mostrar para cada item do carrinho
      <div key={produto.pk_produtos_unidade_id}>
        <p>{produto.produto_nome}</p>
        {/* Adicione mais informações conforme necessário */}
      </div>
    ));
  };

  const finalizarVenda = () => {
    // Adicione aqui a lógica para finalizar a venda, por exemplo, enviar os itens do carrinho para o servidor, etc.
    // Após finalizar a venda, você pode limpar o carrinho se necessário.
    localStorage.removeItem('carrinho');
    setCarrinho([]);
  };

  return (
    <Container>
    <MenuLateral />
    <Conteudo>
        <SystemVendas>
            <Title>Sistema de Vendas</Title>

            <DivFinalizar>
                <Link to="/Gerenciador/SistemaVendas/FinalizarVenda">
                    <Button>Ver / Finalizar Venda</Button>
                </Link>
            </DivFinalizar>
    <div>
      <h2>Itens no Carrinho</h2>
      {renderItensCarrinho()}
      <button onClick={finalizarVenda}>Finalizar Venda</button>
    </div>
            {/* <TabelaProdutosVenda /> */}

        </SystemVendas>
    </Conteudo>
</Container>
  );
}
