import { useEffect, useState } from "react";
import { Table, Td, ThHeader, TrHeader, Tr, StyledLink } from "./styles";
import { Link } from "react-router-dom";



export function TabelaUsuarios() {
    type Usuario = {
        user_nome: string;
        user_email: string;
        data_cadastro: string;
        tipo_usuario: string;
        end_completo: string;
        telefone: string;
        pk_user_id: string;
    }

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {

        const apiUrl = 'http://localhost:3001/users/list';

        fetch(apiUrl)
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const t = data
                setUsuarios(t)
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Table>
            <thead>
                <TrHeader>

                    <ThHeader>Nome</ThHeader>
                    <ThHeader>Email</ThHeader>
                    <ThHeader>Data de Cadastro</ThHeader>
                    <ThHeader>Tipo de Usuário</ThHeader>
                    <ThHeader>Endereço Completo</ThHeader>
                    <ThHeader>Telefone</ThHeader>

                </TrHeader>
            </thead>

            <tbody>
                {usuarios.map((usuario, index) => (
                    <Tr key={usuario.pk_user_id} onClick={() => null}>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.user_nome}
                                </p>
                            </StyledLink>
                        </Td>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.user_email}
                                </p>
                            </StyledLink>
                        </Td>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.data_cadastro}
                                </p>
                            </StyledLink>
                        </Td>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.tipo_usuario}
                                </p>
                            </StyledLink>
                        </Td>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.end_completo}
                                </p>
                            </StyledLink>
                        </Td>
                        <Td>
                            <StyledLink to={`/Gerenciador/SistemaUsuarios/EditarUsuario/${usuario.pk_user_id}`}>
                                <p>
                                    {usuario.telefone}
                                </p>
                            </StyledLink>
                        </Td>
                    </Tr>
                ))}
            </tbody>
        </Table>
    )
}