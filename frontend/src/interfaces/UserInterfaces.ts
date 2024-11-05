export interface IUser {
    pk_user_id: string;
    user_nome: string;
    user_email: string;
    data_cadastro: string;
    tipo_usuario: string;
    end_completo: string;
    telefone: string;
    endereco: IEndereco;
  }
  
 export  interface IEndereco {
    logradouro: string;
    pais: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    numero: string;
    complemento: string;
  }