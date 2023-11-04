import styled from 'styled-components'
import { corDaFontClara, corDaFontEscura, CorDestaque } from '../../../const/global_const'
import { Link } from 'react-router-dom';


export const Table = styled.table`
  /* width: 60rem; */
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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;