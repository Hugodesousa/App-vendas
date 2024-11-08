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
  
`

export const IconeSistema = styled.button`
  color: ${corDaFontClara};
  background-color: ${corDeFundoEscura};
  padding: 11px;
  border-width: 2px;
  display: flex;
  justify-content: center;
  border-color:  #9B111E;
  border-style: solid;
  width: 10rem;
  height: 3rem;
  margin: 1rem;
  &:hover {
    background-color: ${CorDestaque};
      }
`

