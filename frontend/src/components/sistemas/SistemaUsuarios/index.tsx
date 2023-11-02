import { useEffect, useState } from "react";
import { Container, Conteudo } from "../../Home/styles";
import { IconeMenuLateral } from "../../IconeMenuLateral";

export function SistemaUsuarios() {
  type Usuario = {
      user_nome: string;
      user_email: string;
      data_cadastro: string;
      tipo_usuario: string;
      end_completo: string;
      telefone: string;
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {

    const apiUrl = 'http://localhost:3001/users/list';

    // Faça a chamada GET usando o método fetch
    fetch(apiUrl)
      .then((response) => {
        // Verifique se a resposta da API está OK (código de status 200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse a resposta como JSON
        return response.json();
      })
      .then((data) => {
        // Os dados da API estão disponíveis aqui
        console.log(data);
        const t = data
        setUsuarios(t)
        // Se você estiver usando React, você pode atualizar o estado com os dados
        // setData(data);
      })
      .catch((error) => {
        // Trate erros, como problemas de rede ou problemas na API
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Remova a vírgula aqui

  return (

    <Container>
      <IconeMenuLateral />
      <Conteudo>
         <div>
      <h1>Tabela de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Cadastro</th>
            <th>Tipo de Usuário</th>
            <th>Endereço Completo</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.user_nome}</td>
              <td>{usuario.user_email}</td>
              <td>{usuario.data_cadastro}</td>
              <td>{usuario.tipo_usuario}</td>
              <td>{usuario.end_completo}</td>
              <td>{usuario.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </Conteudo>

    </Container>
  )
}