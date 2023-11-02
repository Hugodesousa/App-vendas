import styled from 'styled-components'
import { corDaFontClara, corDaFontEscura, corDeFundoClara, corDeFundoEscura, CorDestaque } from '../../const/global_const'

export const SystemUser = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    padding: 2rem;
`;
export const DivNovoUser = styled.div`
    display: flex;
    justify-content: end;
    margin-right: 2rem;
    
`;

export const Table = styled.table`
  width: 60rem;
  border-collapse: collapse;
  margin: 2rem;
`;

export const ThHeader = styled.th`
  padding: 0.8rem;
  text-align: left;
  border: 0.15rem solid #ddd;
  font-size: small;
  text-align: center;
`;

export const TdHeader = styled.td`
  padding: 0.8rem;
  border: 0.15rem solid #ddd;
  font-size: small;
  text-align: center;
`;

export const Th = styled.th`
  padding: 0.8rem;
  text-align: left;
  border: 0.15rem solid #ddd;
  font-size: small;
  text-align: center;
`;

export const Td = styled.td`
  padding: 0.8rem;
  border: 0.15rem solid #ddd;
  font-size: small;
  text-align: center;

`;

export const TrHeader = styled.tr`
    background-Color:  ${corDaFontEscura};
    color: ${corDaFontClara};

`;

export const Tr = styled.tr`
    &:hover {
    background-color: ${CorDestaque};
    cursor: pointer;
  }

`;

export const TrHover = styled.tr`


`;

export const Button = styled.button`
  width: 4rem;
  height: 2.5rem
`;