import React, { useState, useEffect } from "react";
import { Container, Conteudo } from "../../../Home/styles";
import { MenuLateral } from "../../../MenuLateral";
import { Button, DivFinalizar, SystemVendas, Title } from "../CriarVenda/styles";
import { useNavigate, Link  } from "react-router-dom";
import { StyledLink, Table, Td, ThHeader, Tr, TrHeader } from "../TabelaprodutosVenda/styles";


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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    const carrinhoAtualString = localStorage.getItem('carrinho');
    const carrinhoAtual: Produto[] = carrinhoAtualString ? JSON.parse(carrinhoAtualString) : [];
    setCarrinho(carrinhoAtual);
  }, []);


  const filteredProdutos = carrinho
    .filter((produto, index, self) => {
      return index === self.findIndex((p) => p.pk_produtos_unidade_id === produto.pk_produtos_unidade_id);
    })
    .filter((produto) => {
      return (
        (produto.codigo_fabrica && produto.codigo_fabrica.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (produto.produto_nome && produto.produto_nome.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const finalizarVenda = () => {

    const apiUrl = `http://localhost:3001/venda/cadastrar`;
  //   const requestBody = [
  //     ...carrinho
  // ];

  const usuario_login = localStorage.getItem('usuario_login');
  const requestBody = {


    vendedorId: 1,
    clienteId:2,
    total: null,
    itens: [...carrinho]
  };
    console.log(requestBody);
    

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem('carrinho');
        // <Link to=""></Link>
        alert("Venda cadastrada")
        navigate("/Gerenciador/SistemaVendas");
        // setCarrinho([]);
        // alert('Venda Cadastrada');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  };


  const salvarCarrinhoLocalStorage = (produto: Produto) => {
    try {
      const carrinhoAtualString = localStorage.getItem('carrinho');
      const carrinhoAtual: Produto[] = carrinhoAtualString ? JSON.parse(carrinhoAtualString) : [];

      const novoCarrinho = [...carrinhoAtual, produto];

      const novoCarrinhoString = JSON.stringify(novoCarrinho);
      localStorage.setItem('carrinho', novoCarrinhoString);
      setCarrinho(novoCarrinho);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };


  const removerCarrinhoLocalStorage = (pkProdutosUnidadeId: number) => {
    try {
      const carrinhoAtualString = localStorage.getItem('carrinho');
      const carrinhoAtual: Produto[] = carrinhoAtualString ? JSON.parse(carrinhoAtualString) : [];

      const indexToRemove = carrinhoAtual.findIndex(item => item.pk_produtos_unidade_id === pkProdutosUnidadeId);

      if (indexToRemove !== -1) {
        const novoCarrinho = [...carrinhoAtual.slice(0, indexToRemove), ...carrinhoAtual.slice(indexToRemove + 1)];

        const novoCarrinhoString = JSON.stringify(novoCarrinho);
        localStorage.setItem('carrinho', novoCarrinhoString);
        setCarrinho(novoCarrinho);
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };


  const isProdutoNoCarrinho = (produtoId: number) => {

    return carrinho.some(item => item.pk_produtos_unidade_id === produtoId);
  }

  const renderProdutos = () => {
    return filteredProdutos.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map((produto, index) => {
      const quantidadeNoCarrinho = carrinho.filter(item => item.pk_produtos_unidade_id === produto.pk_produtos_unidade_id).length;

      return (
        <Tr key={index}>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.codigo_fabrica}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.produto_nome}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.descricao}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.quantidade_estoque}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.preco_custo}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.preco_venda}</p>
            </StyledLink>
          </Td>
          <Td>
            <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
              <p>{produto.categoria_nome}</p>
            </StyledLink>
          </Td>
          <Td>
            <button onClick={() => salvarCarrinhoLocalStorage(produto)}>
              {quantidadeNoCarrinho !== 0 ? `+: ${quantidadeNoCarrinho}` : '+'}
            </button>
          </Td>
          <Td>
            <button onClick={() => removerCarrinhoLocalStorage(produto.pk_produtos_unidade_id)} disabled={!isProdutoNoCarrinho(produto.pk_produtos_unidade_id)}>
              -
            </button>
          </Td>
        </Tr>
      );
    });
  };

  const handleNextPage = () => {
    setCurrentIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
  };

  const handlePreviousPage = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - ITEMS_PER_PAGE));
  };

  return (
    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemVendas>
          <Title>Sistema de Vendas</Title>

          <DivFinalizar>
            <Link to="/Gerenciador/SistemaVendas/FinalizarVenda">
              <Button onClick={() => finalizarVenda() } >Finalizar Venda</Button>
            </Link>
          </DivFinalizar>
          <div>
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Buscar por nome ou código de fábrica do produto"
              />
            </div>
            <Table>
              <thead>
                <TrHeader>
                  <ThHeader>Código de Fábrica</ThHeader>
                  <ThHeader>Nome do Produto</ThHeader>
                  <ThHeader>Descrição</ThHeader>
                  <ThHeader>Qtd.Estoque</ThHeader>
                  <ThHeader>P.Custo</ThHeader>
                  <ThHeader>P.Venda</ThHeader>
                  <ThHeader>Categoria</ThHeader>
                  <ThHeader>Adicionar</ThHeader>
                  <ThHeader>Remover</ThHeader>
                </TrHeader>
              </thead>
              <tbody>
                {renderProdutos()}
              </tbody>
            </Table>
            <div>
              <button onClick={handlePreviousPage} disabled={currentIndex === 0}>Página Anterior</button>
              <p>Página {currentIndex / ITEMS_PER_PAGE + 1} de {Math.ceil(filteredProdutos.length / ITEMS_PER_PAGE)}</p>
              <button onClick={handleNextPage} disabled={currentIndex + ITEMS_PER_PAGE >= filteredProdutos.length}>Próxima Página</button>
            </div>
          </div>

        </SystemVendas>
      </Conteudo>
    </Container>
  );
}
