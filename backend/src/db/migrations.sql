-- Inserir tipos de usuários
INSERT INTO usuarios_tipo (tipo_usuario, user_tipo_ativo)
VALUES
  ('Administrador', 1),
  ('Vendedor', 1),
  ('Cliente', 1),
  ('FORNECEDOR',1);

-- Inserir estados
INSERT INTO estados (estado_nome)
VALUES
  ('Acre'),
  ('Alagoas'),
  ('Amapá'),
  ('Amazonas'),
  ('Bahia'),
  ('Ceará'),
  ('Distrito Federal'),
  ('Espírito Santo'),
  ('Goiás'),
  ('Maranhão'),
  ('Mato Grosso'),
  ('Mato Grosso do Sul'),
  ('Minas Gerais'),
  ('Pará'),
  ('Paraíba'),
  ('Paraná'),
  ('Pernambuco'),
  ('Piauí'),
  ('Rio de Janeiro'),
  ('Rio Grande do Norte'),
  ('Rio Grande do Sul'),
  ('Rondônia'),
  ('Roraima'),
  ('Santa Catarina'),
  ('São Paulo'),
  ('Sergipe'),
  ('Tocantins');

-- Inserir exemplo de endereço para Distrito Federal
INSERT INTO endereco (logradouro, pais, cep, estado, cidade, bairro, numero, complemento, end_completo, data_cadastro, ativo)
VALUES
  ('Rua das Américas', 'Brasil', '70000-000', 7, 'Brasília', 'Asa Sul', 123, 'Apt 101', 'Rua das Américas, Brasília', '2023-10-20', 1);

-- Inserir categorias de produtos
INSERT INTO categorias_produto (nome, descricao)
VALUES
  ('Eletrônicos', 'Produtos eletrônicos em geral'),
  ('Papelaria', 'Produtos de papelaria variados');

-- Inserir fornecedores
INSERT INTO fornecedores (nome, fk_endereco, email, fk_contato, site, fk_user_tipo_id, data_cadastro, status_ativo)
VALUES
  ('Fornecedor A', 1, 'fornecedorA@email.com', 1, 'www.fornecedora.com', 4, '2023-10-20', 1),
  ('Fornecedor B', 1, 'fornecedorB@email.com', 1, 'www.fornecedorb.com', 4, '2023-10-20', 1);

-- Inserir exemplo de usuário
INSERT INTO usuarios (user_nome, user_senha, user_email, data_cadastro, fk_user_tipo_id, fk_endereco_id, user_ativo)
VALUES
  ('Usuário Exemplo', '1234', 'usuarioexemplo@email.com', '2023-10-20', 1, 1, 1);
  ('Usuário Exemplo', '1234', 'usuarioexemplo@email.com', '2023-10-20', 2, 1, 1);
  ('Usuário Exemplo', '1234', 'usuarioexemplo@email.com', '2023-10-20', 3, 1, 1);

-- Inserir status de vendas/compras
INSERT INTO status_venda_compra (descricao, status_ativo)
VALUES
  ('Em processamento', 1),
  ('Concluída/Paga', 1),
  ('Concluída/Aguardando Pagamento', 1);
  ('Cancelada', 1);


-- Inserir condições de pagamento
INSERT INTO condicao_pagamento (descricao, numero_parcelas, status_ativo)
VALUES
  ('À vista', 1, 1),
  ('Parcelado em 2 vezes', 2, 1),
  ('Parcelado em 3 vezes', 3, 1);


-- Inserir produtos em unidade
INSERT INTO produtos_unidade (codigo_fabrica, descricao, quantidade_estoque, preco_custo, preco_venda, fk_produto_categoria, data_cadastro, data_fabricacao, data_validade, fk_fornecedor_id, fk_promocao, produto_ativo)
VALUES
  ('12345', 'Produto 1', 100, 10.00, 15.00, 1, '2023-10-20', null, null, 1, 0, 1),
  ('67890', 'Produto 2', 50, 20.00, 30.00, 2, '2023-10-20', null, null, 2, 0, 1);

-- Inserir produtos em embalagem
INSERT INTO produtos_embalagem (fk_produto_id, descricao, quantidade_und_na_embalagem, quantidade_estoque, preco_custo, preco_venda, fk_produto_categoria, data_cadastro, data_fabricacao, data_validade, fk_fornecedor_id, fk_promocao, produto_ativo)
VALUES
  (1, 'Embalagem 1', 10, 10, 100.00, 150.00, 1, '2023-10-20', null, null, 1, 0, 1),
  (2, 'Embalagem 2', 10, 5, 100.00, 130.00, 2, '2023-10-20', null, null, 2, 0, 1);

-- Inserir vendas/com
INSERT INTO vendas_compra (data_venda, fk_cliente_id, fk_vendedor_id, total_venda, fk_condicao_pagamento_id, fk_status_venda_compra_id)
VALUES
  ('2023-10-20', 4, 3, 100.00, 1, 2),
  ('2023-10-19', 4, 3, 50.00, 3, 3);