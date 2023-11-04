import { Container, Conteudo } from "../../Home/styles";
import { MenuLateral } from "../../MenuLateral";
import { TabelaProdutos } from "./Tabelaprodutos";
import { Button, Title, SystemProducts, DivNovoProduto } from "./styles";
import { Link } from "react-router-dom";



export function SistemaProdutos() {

    return (

        <Container>
            <MenuLateral />
            <Conteudo>
                <SystemProducts>
                    <Title>Sistema de Produtos</Title>

                    <DivNovoProduto>
                        {/* <Link to="/Gerenciador/SistemaUsuarios/InserirUsuario"> */}
                        <Button>    Cadastrar</Button>
                        {/* </Link> */}
                    </DivNovoProduto>
                    
                    <TabelaProdutos />
                </SystemProducts>
            </Conteudo>

        </Container>
    )
}