import { Routes, Route} from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle'
import { Home } from './components/Home'
import { SistemaUsuarios } from './components/sistemas/SistemaUsuarios';
import { Gerenciador } from './components/Menus/Gerenciador';
import { EditarUsuario } from './components/sistemas/SistemaUsuarios/EditarUsuario';
import { InserirUsuario } from './components/sistemas/SistemaUsuarios/InserirUsuario';
import { SistemaProdutos } from './components/sistemas/SistemaProdutos';
import { InserirProduto } from './components/sistemas/SistemaProdutos/InserirProduto';
import { EditarProduto } from './components/sistemas/SistemaProdutos/EditarProduto';

export function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>

        <Route path="/" element={<Home />} />
        
        <Route path="/Gerenciador" element={<Gerenciador />} />

        <Route path="/Gerenciador/SistemaUsuarios" element={<SistemaUsuarios />} />
        <Route path="/Gerenciador/SistemaUsuarios/EditarUsuario/:userId" element={<EditarUsuario />} />
        <Route path="/Gerenciador/SistemaUsuarios/InserirUsuario" element={<InserirUsuario />} />

        <Route path="/Gerenciador/SistemaProdutos" element={<SistemaProdutos />} />
        <Route path="/Gerenciador/SistemaProdutos/InserirProduto" element={<InserirProduto />} />
        <Route path="/Gerenciador/SistemaProdutos/EditarProduto/:produtoId" element={<EditarProduto />} />

      </Routes>
    </>

  );
}