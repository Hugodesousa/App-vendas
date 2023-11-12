import styled from 'styled-components'
import { CorDestaque, corDaFontClara, corDaFontEscura, corDeFundoEscura } from '../const/global_const'

export const Container = styled.div`
  display: flex;
`

export const Conteudo = styled.div`
  color: ${corDaFontEscura};
  
  /* border-width: 2px;
  border-color:  #9B111E; */
  /* border-style: solid; */

  /* width: 110rem; */
  /* flex-grow: 1; */
  width: calc(100% - 12rem);
  margin-left: 12rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  text-align: center;
  overflow-x: auto;
  
`;

