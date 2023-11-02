import { useEffect, useState } from "react";
import { Container, Conteudo } from "../../Home/styles";
import { MenuLateral } from "../../MenuLateral";
import { Table, Td, Button, Title, SystemUser, DivNovoUser, ThHeader, TrHeader, Tr} from "./styles";



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

    fetch(apiUrl)
      .then((response) => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const t = data
        setUsuarios(t)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (

    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemUser>
          <Title>Tabela de Usuários</Title>
          <DivNovoUser>
            <Button onClick={() => null}>+ Novo Usuario</Button>
          </DivNovoUser>
          <Table>
            <thead>
              <TrHeader>
                <ThHeader>Nome</ThHeader>
                <ThHeader>Email</ThHeader>
                <ThHeader>Data de Cadastro</ThHeader>
                <ThHeader>Tipo de Usuário</ThHeader>
                <ThHeader>Endereço Completo</ThHeader>
                <ThHeader>Telefone</ThHeader>

              </TrHeader>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <Tr key={index} onClick={() => null}>

                  <Td> {usuario.user_nome} </Td>
                  <Td>{usuario.user_email}</Td>
                  <Td>{usuario.data_cadastro}</Td>
                  <Td>{usuario.tipo_usuario}</Td>
                  <Td>{usuario.end_completo}</Td>
                  <Td>{usuario.telefone}</Td>

                </Tr>
              ))}
            </tbody>
          </Table>
        </SystemUser>
      </Conteudo>

    </Container>
  )
}