-- Definição do esquema do banco de dados "sistema_vendas"

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  pk_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_nome VARCHAR(50),
  user_senha VARCHAR(12),
  user_email VARCHAR(20),
  data_cadastro DATE,
  fk_user_tipo_id INT,
  fk_endereco_id INT,
  user_ativo BOOLEAN,
  FOREIGN KEY (fk_user_tipo_id) REFERENCES usuarios_tipo(pk_user_tipo_id),
  FOREIGN KEY (fk_endereco_id) REFERENCES endereco(pk_endereco_id)
);

-- Tabela de Tipos de Usuários
CREATE TABLE IF NOT EXISTS usuarios_tipo (
  pk_user_tipo_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo_usuario VARCHAR,
  user_tipo_ativo BOOLEAN
);

-- Tabela de Contatos
CREATE TABLE IF NOT EXISTS contatos (
  pk_contato_id INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_user_id INT,
  fk_user_tipo_id INT,
  ddi INT,
  ddd INT,
  telefone INT,
  data_cadastro DATE,
  ativo BOOLEAN,
  FOREIGN KEY (fk_user_id) REFERENCES usuarios(pk_user_id),
  FOREIGN KEY (fk_user_tipo_id) REFERENCES usuarios_tipo(pk_user_tipo_id)
);

-- Tabela de Estados
CREATE TABLE IF NOT EXISTS estados (
  pk_estado_id INTEGER PRIMARY KEY AUTOINCREMENT,
  estado_nome VARCHAR(20)
);

-- Tabela de Endereços
CREATE TABLE IF NOT EXISTS endereco (
  pk_endereco_id INTEGER PRIMARY KEY AUTOINCREMENT,
  logradouro VARCHAR(50),
  pais VARCHAR(10),
  cep VARCHAR(8),
  estado INT,
  cidade VARCHAR(20),
  bairro VARCHAR(20),
  numero INT,
  complemento VARCHAR(40),
  end_completo VARCHAR(60),
  data_cadastro DATE,
  ativo BOOLEAN,
  FOREIGN KEY (estado) REFERENCES estados(pk_estado_id)
);

-- Tabela de Produtos (Unidade)
CREATE TABLE IF NOT EXISTS produtos_unidade (
  pk_produtos_unidade_id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_fabrica VARCHAR,
  descricao VARCHAR,
  quantidade_estoque INT,
  preco_custo DECIMAL,
  preco_venda DECIMAL,
  fk_produto_categoria VARCHAR,
  data_cadastro DATE,
  data_fabricacao DATE,
  data_validade DATE,
  fk_fornecedor_id INT,
  fk_promocao BOOLEAN,
  produto_ativo BOOLEAN,
  FOREIGN KEY (fk_produto_categoria) REFERENCES categorias_produto(pk_categoria_id),
  FOREIGN KEY (fk_fornecedor_id) REFERENCES fornecedores(pk_fornecedor_id)
);

-- Tabela de Produtos (Embalagem)
CREATE TABLE IF NOT EXISTS produtos_embalagem (
  pk_produtos_embalagem_id INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_produto_id INT,
  descricao VARCHAR,
  quantidade_und_na_embalagem INT,
  quantidade_estoque INT,
  preco_custo DECIMAL,
  preco_venda DECIMAL,
  fk_produto_categoria VARCHAR,
  data_cadastro DATE,
  data_fabricacao DATE,
  data_validade DATE,
  fk_fornecedor_id INT,
  fk_promocao BOOLEAN,
  produto_ativo BOOLEAN,
  FOREIGN KEY (fk_produto_id) REFERENCES produtos_unidade(pk_produtos_unidade_id),
  FOREIGN KEY (fk_produto_categoria) REFERENCES categorias_produto(pk_categoria_id),
  FOREIGN KEY (fk_fornecedor_id) REFERENCES fornecedores(pk_fornecedor_id)
);

-- Tabela de Categorias de Produtos
CREATE TABLE IF NOT EXISTS categorias_produto (
  pk_categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR,
  descricao TEXT
);

-- Tabela de Fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
  pk_fornecedor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR,
  fk_endereco INT,
  email VARCHAR,
  fk_contato INT,
  site VARCHAR,
  fk_user_tipo_id INT,
  data_cadastro DATE,
  status_ativo BOOLEAN,
  FOREIGN KEY (fk_endereco) REFERENCES endereco(pk_endereco_id),
  FOREIGN KEY (fk_user_tipo_id) REFERENCES usuarios_tipo(pk_user_tipo_id),
  FOREIGN KEY (fk_contato) REFERENCES contatos(pk_contato_id)
);

-- Tabela de Vendas/Compras
CREATE TABLE IF NOT EXISTS vendas_compra (
  pk_venda_compra_id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_venda DATE,
  fk_cliente_id INT,
  fk_vendedor_id INT,
  total_venda DECIMAL,
  fk_condicao_pagamento_id INT,
  fk_status_venda_compra_id INT,
  FOREIGN KEY (fk_cliente_id) REFERENCES usuarios(pk_user_id),
  FOREIGN KEY (fk_vendedor_id) REFERENCES usuarios(pk_user_id),
  FOREIGN KEY (fk_condicao_pagamento_id) REFERENCES condicao_pagamento(pk_condicao_pagamento_id),
  FOREIGN KEY (fk_status_venda_compra_id) REFERENCES status_venda_compra(pk_status_venda_compra_id)
);

-- Tabela de Status de Vendas/Compras
CREATE TABLE IF NOT EXISTS status_venda_compra (
  pk_status_venda_compra_id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao VARCHAR(50),
  status_ativo BOOLEAN
);

-- Tabela de Condições de Pagamento
CREATE TABLE IF NOT EXISTS condicao_pagamento (
  pk_condicao_pagamento_id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao VARCHAR(50),
  numero_parcelas INT,
  status_ativo BOOLEAN
);


-- Tabela de Itens de Vendas/Compras
CREATE TABLE IF NOT EXISTS vendas_compra_itens (
  pk_venda_compra_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
  fk_item_id INT,
  qnt INT,
  fk_compra_venda INT,
  FOREIGN KEY (fk_item_id) REFERENCES produtos_embalagem(pk_produtos_embalagem_id),
  FOREIGN KEY (fk_item_id) REFERENCES produtos_unidade(pk_produtos_unidade_id),
  FOREIGN KEY (fk_compra_venda) REFERENCES vendas_compra(pk_venda_compra_id)
);
