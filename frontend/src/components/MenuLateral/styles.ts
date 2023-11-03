import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { CorDestaque } from '../const/global_const';

export const ContainerMenuLateral = styled.div`
  position: fixed;
  display: flex;
  height: 100vh;
  width: 12rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  background-color: #404040;

  button {
    margin-top: 24px;
  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Logo = styled.img`
  width: 8rem;
`

export const Menus = styled.div`
border-width: 2px;
border-color:  #9B111E;
border-style: solid;
margin-top: 2rem;
width: 12rem;
padding: 0.7rem;
`

export const ListaMenus = styled.ul`
margin-left: 1rem;
margin-top: 1rem;
`

export const MenuLateralItem = styled.li`
  &:hover {
    font-size: large;
    cursor: pointer;
  }
`
// export const Image = styled.img`
//   width: 240px;
// `