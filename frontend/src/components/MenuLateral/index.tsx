import { ContainerMenuLateral, ListaMenus, Logo, MenuLateralItem, Menus, StyledLink } from "./styles";


export function MenuLateral() {

  return (
    <ContainerMenuLateral>
      <Logo
        src="https://w7.pngwing.com/pngs/130/947/png-transparent-logo-business-exemplis-brand-design-angle-text-rectangle.png"
        alt="ReactJS logo"
      />
      <Menus>
        <h3>Menus</h3>
        <ListaMenus>

          <StyledLink to="/Gerenciador">
            <MenuLateralItem>
              <p>Gerenciador</p>
            </MenuLateralItem>
          </StyledLink>

        </ListaMenus>

      </Menus>
    </ContainerMenuLateral>
  )
}