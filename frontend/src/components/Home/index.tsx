// import { Button } from '../Button'
import { Container, Conteudo, IconeSistema } from './styles'
import { IconeMenuLateral } from "../IconeMenuLateral";
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { types } from '@babel/core';
import { GlobalContext } from '../../context/context';
import { Link } from 'react-router-dom';




export function Home() {

  const {
    sistemaUsado,
    setSistemaUsado,
    menuUsado,
    setMenuUsado
  } = useContext(GlobalContext);



  return (
    <Container>
      <IconeMenuLateral />
      <Conteudo>
        {menuUsado === '' &&
          <h1>Bem vindo</h1>
        }

        {menuUsado.toLowerCase() === 'gerenciador' &&
          <>
            {/* <Link to="/SistemaUsuarios">
              <IconeSistema>
                <p>Usuarios</p>
              </IconeSistema>
            </Link> */}
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema><IconeSistema>
              <p>Usuarios</p>
            </IconeSistema><IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
          </>
        }
      </Conteudo>

    </Container>
  );
}
