import { GlobalStyle } from './styles/GlobalStyle'
import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home'
import { SistemaUsuarios } from './components/sistemas/SistemaUsuarios';
import { Gerenciador } from './components/Menus/Gerenciador';

export function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/SistemaUsuarios" element={<SistemaUsuarios />} />
        <Route path="/SistemaUsuarios/Gerenciador" element={<Gerenciador />} />

      </Routes>
    </>

  );
}