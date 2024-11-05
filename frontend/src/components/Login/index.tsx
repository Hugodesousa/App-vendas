import { Container, Conteudo } from './styles';
import { useState } from 'react';
// import * as CryptoJS from 'crypto-ts'; // Importe a biblioteca crypto-js
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('hugo.sousa');
  const [password, setPassword] = useState('1234');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
    // Criptografar a senha antes de enviar
    //   const encryptedPassword = CryptoJS.AES.encrypt(password, 'sua-chave-secreta').toString();

      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password}),
      });

      if (!response.ok) {
        throw new Error('Erro ao autenticar');
      }

      const { token, pk_user_id,user_nome,user_email,user_str_login,tipo_usuario } = await response.json();
 
      localStorage.setItem('token', token);
      localStorage.setItem('tipo_usuario', tipo_usuario);
      localStorage.setItem('usuario_login', JSON.stringify({pk_user_id,user_nome,user_email,user_str_login}));

      navigate('/home');
    } catch (error) {
      console.error('Erro de autenticação:', error);
      alert('Erro de autenticação');
      
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
