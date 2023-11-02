import { GlobalStyle } from './styles/GlobalStyle'
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home'
import { SistemaUsuarios } from './components/sistemas/SistemaUsuarios';

export function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/SistemaUsuarios" element={<SistemaUsuarios />} />

      </Routes>
    </>

  );
}