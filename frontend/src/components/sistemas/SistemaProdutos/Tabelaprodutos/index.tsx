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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 50;

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
        salvarListaProdutos(data)
        montarListaProdutos();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }, []);

  const montarListaProdutos = () => {
    try {
      const value = localStorage.getItem('listaProdutosLocal');
      if (value !== null) {
        const data = JSON.parse(value) as Produto[]
        setProdutos(data)
      }
    } catch (error) {

    }
  };

  const salvarListaProdutos = (listaProdutos: Produto[]) => {
    try {
      const existingValue = localStorage.getItem('listaProdutosLocal');
      if (existingValue === null) {
        const value = JSON.stringify(listaProdutos);
        localStorage.setItem('listaProdutosLocal', value);
      } else {
        console.log('A chave "listaProdutosLocal" já existe no localStorage. Não foi sobrescrito.');
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const filteredProdutos = produtos.filter((produto) => {
    return (
      (produto.codigo_fabrica && produto.codigo_fabrica.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (produto.produto_nome && produto.produto_nome.toLowerCase().includes(searchTerm.toLowerCase()))
      // Adicione mais verificações para outros campos, se necessário
    );
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const renderProdutos = () => {
    return filteredProdutos.slice(currentIndex, currentIndex + ITEMS_PER_PAGE).map((produto, index) => (
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
          <StyledLink to={`/Gerenciador/SistemaProdutos/EditarProduto/${produto.pk_produtos_unidade_id}`}>
            <p>{produto.data_cadastro}</p>
          </StyledLink>
        </Td>
      </Tr>
    ));
  };

  const handleNextPage = () => {
    setCurrentIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
  };

  const handlePreviousPage = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - ITEMS_PER_PAGE));
  };

  return (
    <div>
      <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar por nome ou código de fábrica do produto"
      />
      {/* Restante do seu código */}
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
            <ThHeader>Cadastro</ThHeader>
          </TrHeader>
        </thead>
        <tbody>
          {renderProdutos()}
        </tbody>
      </Table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentIndex === 0}>Página Anterior</button>
        <p>Página {currentIndex / ITEMS_PER_PAGE + 1} de {Math.ceil(produtos.length / ITEMS_PER_PAGE)}</p>
        <button onClick={handleNextPage} disabled={currentIndex + ITEMS_PER_PAGE >= produtos.length}>Próxima Página</button>
      </div>
    </div>
  );

};


