import styled from 'styled-components';
import { corDaFontClara, corDaFontEscura, CorDestaque } from '../../../const/global_const';
import { Link } from 'react-router-dom';

const tamanhoInicial = '0.9em';
const tamanhoMenor = '0.85em';
const tamanhoMenorMenor = '0.8em';

export const Table = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  width: 100%;
  font-size: ${tamanhoInicial};

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
    margin: 0.5rem;
  }
`;

export const ThHeader = styled.th`
  padding: 0.7rem;
  text-align: left;
  border: 0.13rem solid #ddd;
  font-size: ${tamanhoInicial};
  text-align: center;

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
    padding: 0.5rem;
  }
`;

export const Td = styled.td`
  padding: 0.7rem;
  border: 0.13rem solid #ddd;
  font-size: ${tamanhoInicial};
  text-align: center;

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
    padding: 0.5rem;
  }
`;

export const TrHeader = styled.tr`
  background-color: ${corDaFontEscura};
  color: ${corDaFontClara};
  font-size: ${tamanhoInicial};

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
  }
`;

export const Tr = styled.tr`
  &:hover {
    background-color: ${CorDestaque};
    cursor: pointer;
  }

  font-size: ${tamanhoInicial};

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${tamanhoInicial};

  @media screen and (max-width: 1080px) {
    font-size: ${tamanhoMenor};
  }
`;
