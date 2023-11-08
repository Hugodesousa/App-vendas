import { Container, Form, FormGroup, FormSection, Input, SubTitle, SubmitButton, SystemEditar } from "./styles";
import { MenuLateral } from "../../../MenuLateral";
import { useState, FormEvent, useEffect } from "react";
import { IProduto } from "../../../../interfaces/ProdutoInterfaces";
import { Conteudo } from "../../../Home/styles";

export function InserirProduto() {
  const [produto, setProduto] = useState<IProduto>({
    codigo_fabrica: '',
    produto_nome: '',
    descricao: '',
    quantidade_estoque: 0,
    preco_custo: 0,
    preco_venda: 0,
    fk_produto_categoria: '',
    data_cadastro: '',
    data_fabricacao: '',
    data_validade: '',
    fk_fornecedor_id: '',
    fk_promocao: 0
  });

  const [categorias, setCategorias] = useState<any[]>([]);
  const [fornecedores, setFornecedores] = useState<any[]>([]);

  useEffect(() => {
    fetchCategorias();
    fetchFornecedores();
  }, []);

  const fetchCategorias = async () => {
    const apiUrl = `http://localhost:3001/products/list/categorias`

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dataCategorias = data;
        setCategorias(dataCategorias);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const fetchFornecedores = async () => {
    const apiUrl = `http://localhost:3001/products/list/fornecedores`

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const dataFornecedores = data;
        setFornecedores(dataFornecedores);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      produto.codigo_fabrica === '' ||
      produto.produto_nome === '' ||
      produto.descricao === '' ||
      produto.quantidade_estoque === 0 ||
      produto.preco_custo === 0 ||
      produto.preco_venda === 0 ||
      produto.fk_produto_categoria === '' ||
      produto.fk_fornecedor_id === ''
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }



    const apiUrl = `http://localhost:3001/produtos/InserirProduto`;
    const requestBody = {
      ...produto
    };

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
        alert('Produto Inserido');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });


  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  return (
    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemEditar>
          <h1>Inserir Novo Produto</h1>
          <Form onSubmit={handleSubmit}>
            <SubTitle>Dados do Produto</SubTitle>
            <FormSection>
              <FormGroup>
                <label>Código de Fábrica:</label>
                <Input
                  type="text"
                  name="codigo_fabrica"
                  value={produto.codigo_fabrica}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nome do Produto:</label>
                <Input
                  type="text"
                  name="produto_nome"
                  value={produto.produto_nome}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Descrição:</label>
                <Input
                  type="text"
                  name="descricao"
                  value={produto.descricao}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Quantidade em Estoque:</label>
                <Input
                  type="number"
                  name="quantidade_estoque"
                  value={produto.quantidade_estoque}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Preço de Custo:</label>
                <Input
                  type="number"
                  name="preco_custo"
                  value={produto.preco_custo}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Preço de Venda:</label>
                <Input
                  type="number"
                  name="preco_venda"
                  value={produto.preco_venda}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Categoria do Produto:</label>
                <select
                  name="fk_produto_categoria"
                  value={produto.fk_produto_categoria}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione a Categoria</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria.pk_categoria_id
                    }>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Fornecedor:</label>
                <select
                  name="fk_fornecedor_id"
                  value={produto.fk_fornecedor_id}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecione o Fornecedor</option>
                  {fornecedores.map((fornecedor, index) => (
                    <option key={index} value={fornecedor.pk_fornecedor_id}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </FormSection>
            <FormGroup>
              <SubmitButton type="submit">Inserir</SubmitButton>
            </FormGroup>
          </Form>
        </SystemEditar>
      </Conteudo>
    </Container>
  );

}
