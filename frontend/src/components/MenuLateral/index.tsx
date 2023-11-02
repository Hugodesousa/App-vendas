// import { Button } from '../Button'
import { ContainerMenuLateral, ListaMenus, Logo, MenuLateralItem, Menus } from "./styles";
import { GlobalContext } from '../../context/context';
import { useContext } from "react";

export function MenuLateral() {
  const {
    sistemaUsado,
    setSistemaUsado,
    menuUsado,
    setMenuUsado
  } = useContext(GlobalContext);

  
  function handleSayHello() {

  }

  return (
    <ContainerMenuLateral>
      <Logo
        src="https://w7.pngwing.com/pngs/130/947/png-transparent-logo-business-exemplis-brand-design-angle-text-rectangle.png"
        alt="ReactJS logo"
      />
      <Menus>

        <h3>Menus</h3>
        <ListaMenus>
          <MenuLateralItem onClick={() => setMenuUsado('Gerenciador')}>
            Gerenciador
          </MenuLateralItem>
        </ListaMenus>

      </Menus>
    </ContainerMenuLateral>
  )
}