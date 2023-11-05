import styled from 'styled-components'
import { corDaFontClara, corDaFontEscura, CorDestaque } from '../../../const/global_const'
import { Link } from 'react-router-dom';

export const Table = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  width: 100%;

  @media screen and (max-width: 1080px) {
    font-size: 0.95em;
    margin: 0.5rem;
  }
`;

export const ThHeader = styled.th`
  padding: 0.6rem;
  text-align: left;
  border: 0.1rem solid #ddd;
  font-size: 0.9em;
  text-align: center;

  @media screen and (max-width: 1080px) {
    font-size: 0.85em;
    padding: 0.4rem;
  }
`;

export const Td = styled.td`
  padding: 0.6rem;
  border: 0.1rem solid #ddd;
  font-size: 0.9em;
  text-align: center;

  @media screen and (max-width: 1080px) {
    font-size: 0.85em;
    padding: 0.4rem;
  }
`;

export const TrHeader = styled.tr`
    background-Color:  ${corDaFontEscura};
    color: ${corDaFontClara};

    @media screen and (max-width: 1080px) {
      font-size: 0.95em;
    }
`;

export const Tr = styled.tr`
    &:hover {
    background-color: ${CorDestaque};
    cursor: pointer;
  }

  @media screen and (max-width: 1080px) {
    font-size: 0.95em;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
