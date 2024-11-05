// import { Button } from '../Button'
import { Container } from '../styles'
import { MenuLateral } from "../../../MenuLateral";
import { Conteudo } from '../../../Home/styles';
import { TabelaProdutosVenda } from '../TabelaprodutosVenda';
import { Button, DivFinalizar, SystemVendas, Title } from './styles';
import { Link } from 'react-router-dom';



export function CriarVenda() {

    return (
        <Container>
            <MenuLateral />
            <Conteudo>
                <SystemVendas>
                    <Title>Sistema de Vendas</Title>

                    <DivFinalizar>
                        <Link to="/Gerenciador/SistemaVendas/FinalizarVenda">
                            <Button>Ver / Finalizar Venda</Button>
                        </Link>
                    </DivFinalizar>
                    <TabelaProdutosVenda />

                </SystemVendas>
            </Conteudo>
        </Container>
    );
}
