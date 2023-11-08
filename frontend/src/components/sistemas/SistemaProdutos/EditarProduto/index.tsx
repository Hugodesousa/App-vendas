import { Container, DeleteButton, Form, FormGroup, FormSection, FormSectionButtons, Input, SubTitle, SubmitButton, SystemEditar } from "./styles";
import { MenuLateral } from "../../../MenuLateral";
import { useState, FormEvent, useEffect } from "react";
import { IProduto } from "../../../../interfaces/ProdutoInterfaces";
import { useNavigate, useParams } from "react-router-dom";
import { Conteudo } from "../../../Home/styles";

export function EditarProduto() {

    const defaultProductState = {
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
    };
    const [produto, setProduto] = useState<IProduto>(defaultProductState);
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<any[]>([]);
    const [fornecedores, setFornecedores] = useState<any[]>([]);
    const { produtoId } = useParams();


    useEffect(() => {
        fetchCategorias();
        fetchFornecedores();
        fetchProduto();
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

    const fetchProduto = async () => {
        const apiUrl = `http://localhost:3001/products/list/id?produtoId=${produtoId}`

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const receivedProduct = data[0];
                const updatedProduct = {
                    ...defaultProductState,
                    ...receivedProduct
                };
                setProduto(updatedProduct);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });

    };

    const deletarProduto = async () => {
        const apiUrl = `http://localhost:3001/products/delete`;

        const requestBody = { produtoId };

        fetch(apiUrl, {
            method: 'DELETE',
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
                alert("Produto deletado com sucesso");
                navigate("/Gerenciador/SistemaProdutos");
                return data;
            })
            .catch((error) => {
                console.error('Houve um problema ao deletar o usuário:', error);
                return error
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
            produto.fk_fornecedor_id === '' ||
            !produtoId
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const apiUrl = `http://localhost:3001/products/edit`;
        const requestBody = {
            produtoId,
            ...produto
        };

        fetch(apiUrl, {
            method: 'PUT',
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
                alert('Produto Atualizado');
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
                    <h1>Editar Produto</h1>
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
                        <FormSectionButtons>
                            <FormGroup>
                                <SubmitButton type="submit">Editar Produto</SubmitButton>
                            </FormGroup>
                            <FormGroup>
                                <DeleteButton type="button" onClick={() => deletarProduto()}>Deletar</DeleteButton>
                            </FormGroup>
                        </FormSectionButtons>
                    </Form>
                </SystemEditar>
            </Conteudo>
        </Container>
    );

}
