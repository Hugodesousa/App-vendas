import { Button, Container, Form, FormGroup, FormSection, Input, SubTitle, SubmitButton, SystemEditar } from "./styles";
import { MenuLateral } from "../../../MenuLateral";
import { useState, FormEvent, useEffect } from "react";
import { IUser, IEndereco } from "../../../../interfaces/UserInterfaces";
import { Conteudo } from "../../../Home/styles";

export function InserirUsuario() {
    const [usuario, setUsuario] = useState<IUser>({
        pk_user_id: '',
        user_nome: '',
        user_email: '',
        data_cadastro: '',
        tipo_usuario: '',
        end_completo: '',
        telefone: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            pais: '',
        }
    });

    const [tiposUsuarios, setTiposUsuarios] = useState<IUser[]>([]);
    const [contatos, setContatos] = useState([{ pk_contato_id: '', tel: '', ddd: '' }]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchTiposUsuarios();
    }, []);

    const fetchTiposUsuarios = async () => {
        const apiUrl = `http://localhost:3001/users/usuariosTipo`;

        fetch(apiUrl,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTiposUsuarios(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (
            usuario.user_nome &&
            usuario.user_email &&
            usuario.tipo_usuario &&
            usuario.endereco.logradouro &&
            usuario.endereco.numero &&
            usuario.endereco.bairro &&
            usuario.endereco.cidade &&
            usuario.endereco.estado &&
            usuario.endereco.cep &&
            usuario.endereco.pais &&
            contatos.some(contato => contato.tel) // Verifica se pelo menos um telefone foi preenchido
        ) {
            const apiUrl = `http://localhost:3001/users/InserirUsuario`;
            
            const requestBody = {
                novoNome: usuario.user_nome,
                novoEmail: usuario.user_email,
                logradouro: usuario.endereco.logradouro,
                numero: usuario.endereco.numero,
                complemento: usuario.endereco.complemento,
                bairro: usuario.endereco.bairro,
                cidade: usuario.endereco.cidade,
                estado: usuario.endereco.estado,
                cep: usuario.endereco.cep,
                pais: usuario.endereco.pais,
                endCompleto: `${usuario.endereco.logradouro} ${usuario.endereco.numero}, ${usuario.endereco.complemento} - ${usuario.endereco.bairro}, ${usuario.endereco.cidade}, ${usuario.endereco.pais} - ${usuario.endereco.cep}`,
                tipoUser: usuario.tipo_usuario,
                novosContatos: contatos.filter((contato) => contato.tel !== '')
            };


            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                    alert('Usuário Inserido');
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else { alert("Todos os campos devem estar preenchidos") }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleEnderecoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario,
            endereco: {
                ...prevUsuario.endereco,
                [name]: value
            }
        }));
    };

    return (
        <Container>
            <MenuLateral />
            <Conteudo>
                <SystemEditar>
                    <h1>Inserir Novo Usuário</h1>
                    <Form onSubmit={handleSubmit}>
                        <SubTitle>Dados de usuário</SubTitle>
                        <FormSection>
                            <FormGroup>
                                <label>Nome:</label>
                                <Input
                                    type="text"
                                    name="user_nome"
                                    value={usuario.user_nome}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Email:</label>
                                <Input
                                    type="email"
                                    name="user_email"
                                    value={usuario.user_email}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Tipo de Usuário:</label>
                                <select
                                    name="tipo_usuario"
                                    value={usuario.tipo_usuario}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        const { name, value } = event.target;
                                        setUsuario({ ...usuario, [name]: value });
                                    }}
                                >
                                    <option value="">Selecione um tipo</option>
                                    {tiposUsuarios.map((tipo: any) => (
                                        <option key={tipo.pk_user_tipo_id} value={tipo.pk_user_tipo_id}>
                                            {tipo.tipo_usuario}
                                        </option>
                                    ))}
                                </select>

                            </FormGroup>
                        </FormSection>
                        <SubTitle>Dados de Endereço:</SubTitle>
                        <FormSection>
                            {Object.keys(usuario.endereco).map((key) => (
                                <FormGroup key={key}>
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                    <Input
                                        type="text"
                                        name={key}
                                        value={usuario.endereco[key as keyof IEndereco]}
                                        onChange={handleEnderecoChange}
                                    />
                                </FormGroup>
                            ))}
                            <p>{`Endereço completo: ${usuario.endereco.logradouro} ${usuario.endereco.numero}, ${usuario.endereco.complemento} - ${usuario.endereco.bairro}, ${usuario.endereco.cidade}, ${usuario.endereco.pais} - ${usuario.endereco.cep}`}</p>
                        </FormSection>
                        <SubTitle>Dados de Contato:</SubTitle>
                        <FormSection>
                            {contatos.map((contato, index) => (
                                <div key={index}>
                                    <FormGroup>
                                        <label>{`Telefone ${index + 1}`}:</label>
                                        <Input
                                            type="text"
                                            value={contato.tel}
                                            onChange={(e) => {
                                                const newContatos = [...contatos];
                                                newContatos[index].tel = e.target.value;
                                                setContatos(newContatos);
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>DDD:</label>
                                        <Input
                                            type="text"
                                            value={contato.ddd}
                                            onChange={(e) => {
                                                const newContatos = [...contatos];
                                                newContatos[index].ddd = e.target.value;
                                                setContatos(newContatos);
                                            }}
                                        />
                                    </FormGroup>
                                </div>
                            ))}
                            <div>
                                {contatos.length < 3 && (
                                    <Button type="button" onClick={() => setContatos([...contatos, { pk_contato_id: '', tel: '', ddd: '' }])}>
                                        Adicionar Telefone
                                    </Button>
                                )}
                            </div>
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


