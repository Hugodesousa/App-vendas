import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabelaProdutos } from '../Tabelaprodutos';

describe('TabelaProdutos Component', () => {
  test('renderiza a tabela de produtos corretamente', () => {
    render(<TabelaProdutos />);

    // Verifica se a tabela é renderizada
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    //Verifica se os cabeçalhos da tabela estão presentes
    expect(screen.getByText('Código de Fábrica')).toBeInTheDocument();
    expect(screen.getByText('Nome do Produto')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Qtd.Estoque')).toBeInTheDocument();
    expect(screen.getByText('P.Custo')).toBeInTheDocument();
    expect(screen.getByText('P.Venda')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Cadastro')).toBeInTheDocument();

    // Verifica se a busca por texto está funcionando corretamente
    const searchInput = screen.getByPlaceholderText('Buscar por código de fábrica ou nome do produto');
    fireEvent.change(searchInput, { target: { value: 'ABC' } }); // Modifique para um valor apropriado
    expect(searchInput).toHaveValue('ABC'); // Verifica se o valor do input é o esperado após a alteração

    // Verifica se os botões de próxima e página anterior estão desabilitados conforme o esperado
    const previousPageButton = screen.getByText('Página Anterior');
    const nextPageButton = screen.getByText('Próxima Página');
    expect(previousPageButton).toBeDisabled(); // Deve estar desativado no início
    // expect(nextPageButton).not.toBeDisabled(); // Deve estar habilitado no início

    // Testa a navegação entre as páginas
    fireEvent.click(nextPageButton);
    // expect(previousPageButton).not.toBeDisabled(); // Deve estar habilitado após clicar na próxima página

    // Verifica se os produtos renderizam corretamente na tabela
    const produtosRows = screen.getAllByRole('row');
    // Supondo que cada linha representa um produto, verifique os valores renderizados
    produtosRows.forEach((row) => {
      // const cells = row.querySelectorAll('td');
      const cells = row.querySelectorAll('td')
      
      // Modifique os índices e os valores esperados para corresponder aos dados do produto
      expect(cells[0]).toHaveTextContent('Código de Fábrica');
      expect(cells[1]).toHaveTextContent('Nome do Produto');
      expect(cells[2]).toHaveTextContent('Descrição');
      expect(cells[3]).toHaveTextContent('Qtd.Estoque');
      expect(cells[4]).toHaveTextContent('P.Custo');
      expect(cells[5]).toHaveTextContent('P.Venda');
      expect(cells[6]).toHaveTextContent('Categoria');
      expect(cells[7]).toHaveTextContent('Cadastro');
    });

    // Adicione mais testes conforme necessário para as funcionalidades do componente
  });
});
