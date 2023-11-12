import { Container, Conteudo } from './styles';
import { useState } from 'react';
// import jwt from 'jsonwebtoken'; // Importe a biblioteca jsonwebtoken
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Realize a solicitação de autenticação ao seu backend
            const response = await fetch('URL_DO_SEU_BACKEND/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao autenticar');
            }

            // Extraia o token do corpo da resposta
            const { token } = await response.json();

            // Armazene o token localmente (pode usar sessionStorage ou localStorage)
            localStorage.setItem('token', token);

            // Decodifique o token para obter informações do usuário, se necessário
            // const decodedToken = jwt.decode(token);
            // console.log(decodedToken);

            // Redirecione para a página inicial
            navigate('/home');
        } catch (error) {
            console.error('Erro de autenticação:', error);
        }
    };

    return (
        <Container>
            <Conteudo>
                <div>
                    <h2>Login</h2>
                    <form>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <br />
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </Conteudo>
        </Container>
    );
}
