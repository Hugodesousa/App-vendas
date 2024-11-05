
import { Container, DeleteButton, Form, FormGroup, FormSection, FormSectionButtons, Input, SubTitle, SubmitButton, SystemEditar } from "./styles";
import { MenuLateral } from "../../../MenuLateral";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { IUser, IEndereco } from "../../../../interfaces/UserInterfaces";
import { Conteudo } from "../../../Home/styles";

export function EditarUsuario() {
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
      pais: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      numero: '',
      complemento: ''
    }
  });

  const [contatos, setContatos] = useState([{ pk_contato_id: '', tel: '', ddd: '' }]);
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {

    const apiUrl = `http://localhost:3001/users/list/id/?userId=${userId}`

    fetch(apiUrl,{
      headers: {
        'Content-Type': 'application/json',
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
        const usuarioData = data[0];
        setUsuario({
          pk_user_id: usuarioData.pk_user_id,
          user_nome: usuarioData.user_nome,
          user_email: usuarioData.user_email,
          data_cadastro: usuarioData.data_cadastro,
          tipo_usuario: usuarioData.tipo_usuario,
          end_completo: usuarioData.end_completo,
          telefone: usuarioData.telefone,
          endereco: {
            logradouro: usuarioData.logradouro,
            numero: usuarioData.numero,
            complemento: usuarioData.complemento,
            bairro: usuarioData.bairro,
            cidade: usuarioData.cidade,
            estado: usuarioData.estado,
            cep: usuarioData.cep,
            pais: usuarioData.pais,
          }
        });

        const extractedContatos = data.map((item: any) => {
          const { pk_contato_id, tel, ddd } = item;
          return {
            pk_contato_id: pk_contato_id?.toString() || '',
            tel: tel?.toString() || '',
            ddd: ddd?.toString() || '',
          };
        });

        setContatos(extractedContatos);

      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [userId]);

  const fetchPut = async (apiUrl: string, requestBody: any) => {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const apiUrl = `http://localhost:3001/users/edit`;
    const requestBody = {
      novoNome: usuario.user_nome,
      userId: usuario.pk_user_id,
      novoEmail: usuario.user_email,
      logradouro: usuario.endereco.logradouro,
      pais: usuario.endereco.pais,
      cep: usuario.endereco.cep,
      estado: usuario.endereco.estado,
      cidade: usuario.endereco.cidade,
      bairro: usuario.endereco.bairro,
      numero: usuario.endereco.numero,
      complemento: usuario.endereco.complemento,
      endCompleto: `${usuario.endereco.logradouro} ${usuario.endereco.numero}, ${usuario.endereco.complemento} - ${usuario.endereco.bairro}, ${usuario.endereco.cidade}, ${usuario.endereco.pais} - ${usuario.endereco.cep}`,
      novosContatos: contatos
    };

    fetchPut(apiUrl, requestBody)
      .then((data) => {
        alert('Usuário Atualizado');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });


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

  const deletarUsuario = () => {

    const apiUrl = `http://localhost:3001/users/delete`;
    const requestBody = { userId };

    fetch(apiUrl, {
      method: 'DELETE',
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
        alert("Usuário deletado com sucesso");
        navigate("/Gerenciador/SistemaUsuarios");
        return data;
      })
      .catch((error) => {
        console.error('Houve um problema ao deletar o usuário:', error);
        return error
      });
  };

  return (
    <Container>
      <MenuLateral />
      <Conteudo>

        <SystemEditar>

          <h1>Editar Usuario</h1>

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

            </FormSection>

            <SubTitle>Dados de Endereço:</SubTitle>

            <FormSection>
              {Object.keys(usuario.endereco).map((key) => (

                <FormGroup key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <Input
                    type="text"
                    name={key}
                    value={usuario.endereco[key as keyof IEndereco]} // Uso do "as keyof IEndereco"
                    onChange={handleEnderecoChange}
                  />
                </FormGroup>

              ))}

              <p>{`Endereço completo: ${usuario.endereco.logradouro} ${usuario.endereco.numero}, ${usuario.endereco.complemento} - ${usuario.endereco.bairro}, ${usuario.endereco.cidade}, ${usuario.endereco.pais} - ${usuario.endereco.cep}`}</p>

            </FormSection>

            <SubTitle>Dados de Contato:</SubTitle>

            <FormSection>
              {contatos.map((contato, index) => {
                if (contato.pk_contato_id !== '') {
                  return (
                    <div key={index}>

                      <FormGroup>
                        <label>{`Telefone ${index + 1}`}:</label>
                        <Input
                          type="text"
                          name={`tel_${index}`}
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
                          name={`ddd_${index}`}
                          value={contato.ddd}
                          onChange={(e) => {
                            const newContatos = [...contatos];
                            newContatos[index].ddd = e.target.value;
                            setContatos(newContatos);
                          }}
                        />
                      </FormGroup>

                    </div>
                  );
                }
                return null; // Se pk_contato_id for null, renderiza nada
              })}
            </FormSection>
            <FormSectionButtons>
              <FormGroup>
                <SubmitButton type="submit">Atualizar</SubmitButton>
              </FormGroup>
              <FormGroup>
                <DeleteButton type="button" onClick={() => deletarUsuario()}>Deletar</DeleteButton>
              </FormGroup>
            </FormSectionButtons>
          </Form>
        </SystemEditar>
      </Conteudo>
    </Container>
  );
};



