import styled from 'styled-components';
import { CorDestaque } from '../../const/global_const';


export const SystemProducts = styled.div`
    display: flex;
    flex-direction: column;
    
`;

export const Title = styled.h1`
    padding: 2rem;
`;



export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${CorDestaque};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const DivNovoProduto = styled.div`
    display: flex;
    justify-content: end;
    /* margin-right: 5rem; */
    
    
`;