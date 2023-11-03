import { useEffect, useState } from "react";
import { Container, Conteudo } from "../../Home/styles";
import { MenuLateral } from "../../MenuLateral";
import { Button, Title, SystemUser, DivNovoUser } from "./styles";
import { TabelaUsuarios } from "./TabelaUsuarios";



export function SistemaUsuarios() {

  return (

    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemUser>
          <Title>Tabela de Usuários</Title>

          <DivNovoUser>
            <Button onClick={() => null}>+ Novo Usuario</Button>
          </DivNovoUser>

          <TabelaUsuarios />

        </SystemUser>
      </Conteudo>

    </Container>
  )
}