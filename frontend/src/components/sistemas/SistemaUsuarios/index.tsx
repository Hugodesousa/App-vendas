import { useEffect, useState } from "react";
import { Container, Conteudo } from "../../Home/styles";
import { MenuLateral } from "../../MenuLateral";
import { Button, Title, SystemUser, DivNovoUser} from "./styles";
import { TabelaUsuarios } from "../TabelaUsuarios";



export function SistemaUsuarios() {
  // type Usuario = {
  //   user_nome: string;
  //   user_email: string;
  //   data_cadastro: string;
  //   tipo_usuario: string;
  //   end_completo: string;
  //   telefone: string;
  // }

  // const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // useEffect(() => {

  //   const apiUrl = 'http://localhost:3001/users/list';

  //   fetch(apiUrl)
  //     .then((response) => {

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const t = data
  //       setUsuarios(t)
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // }, []);

  return (

    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemUser>
          <Title>Tabela de Usuários</Title>

          <DivNovoUser>
            <Button onClick={() => null}>+ Novo Usuario</Button>
          </DivNovoUser>

          <TabelaUsuarios/>

        </SystemUser>
      </Conteudo>

    </Container>
  )
}