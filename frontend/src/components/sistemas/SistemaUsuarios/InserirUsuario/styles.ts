import styled from "styled-components"
import { CorDestaque, corDaFontEscura } from "../../../const/global_const"

export const Container = styled.div`
  display: flex;
`;

export const Conteudo = styled.div`
  color: ${corDaFontEscura};
  border-width: 2px;
  border-color:  #9B111E;
  border-style: solid;
  /* width: 110rem; */
  width: calc(100% - 12rem);
  margin-left: 12rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  text-align: center;
`;

export const SystemEditar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

export const Form = styled.form`
  display: flex;
 flex-wrap: wrap;
 flex-direction: column;
  align-items:self-start;
  margin-top: 1.5rem;
`;

export const SubTitle = styled.h3`
 padding: 1.5rem;
`;

export const FormSection = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
 border: 0.15rem solid #ddd;
 width: 100%;
 padding: 0.5rem;
`;

export const FormGroup = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.3rem;
  padding: 0.5rem;
  
`;

export const Input = styled.input`
  padding: 5px;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${CorDestaque};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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