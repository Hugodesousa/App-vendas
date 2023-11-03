// import { Button } from '../Button'
import { Container, Conteudo, SystemEditar } from "./styles";
import { MenuLateral } from "../../../MenuLateral";
import { useState, FormEvent, useEffect } from "react";
import { useParams } from 'react-router-dom';


export function EditarUsuario() {
  const [usuario, setUsuario] = useState({
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

  const { userId } = useParams();

  useEffect(() => {

    const apiUrl = `http://localhost:3001/users/list/id/?userId=${userId}`

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

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
            pais: usuarioData.pais,
            cep: usuarioData.cep,
            estado: usuarioData.estado,
            cidade: usuarioData.cidade,
            bairro: usuarioData.bairro,
            numero: usuarioData.numero,
            complemento: usuarioData.complemento
          }
        });

      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const fetchPut = (apiUrl:string, requestBody:any) => {
    return fetch(apiUrl, {
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
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const apiUrl = `http://localhost:3001/users/edit`;
    const requestBody = {
      novoNome: usuario.user_nome,
      userId: usuario.pk_user_id,
      novoEmail: usuario.user_email
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

  return (
    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemEditar>
          <h1>Editar Usuario</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="user_nome"
                value={usuario.user_nome}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="user_email"
                value={usuario.user_email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {/* Adicione mais campos conforme necessário para a edição */}
            <button type="submit">Atualizar</button>
          </form>
        </SystemEditar>
      </Conteudo>

    </Container>
  );
}
