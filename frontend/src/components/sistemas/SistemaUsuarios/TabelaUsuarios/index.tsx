import { useEffect, useState } from "react";
import { Table, Td, ThHeader, TrHeader, Tr, StyledLink } from "./styles";


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
    const token = localStorage.getItem('token');

    useEffect(() => {

        const apiUrl = 'http://localhost:3001/users/list';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const t = data

                const filtrarUsuariosUnicos = (usuarios: Usuario[]) => {
                    const usuariosUnicos = usuarios.filter(
                        (usuario, index, self) =>
                            index === self.findIndex((t) => t.pk_user_id === usuario.pk_user_id)
                    );
                    return usuariosUnicos;
                };
                const usuariosUnicos = filtrarUsuariosUnicos(t);
                setUsuarios(usuariosUnicos);

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

                {usuarios.filter((user) => user.pk_user_id).map((usuario, index) => (
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