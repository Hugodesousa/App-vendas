import styled from 'styled-components'
import { CorDestaque, corDaFontClara, corDaFontEscura, corDeFundoEscura } from '../../const/global_const'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;

`

export const IconeSistema = styled.button`
  color: ${corDaFontClara};
  background-color: ${corDeFundoEscura};
  padding: 11px;
  display: flex;
  justify-content: center;
  /* border-width: 2px;
  border-color:  #9B111E;
  border-style: solid; */
  width: 10rem;
  height: 3rem;
  margin: 3rem;
  margin-top: 4rem;
  &:hover {
    background-color: ${CorDestaque};
      }
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;