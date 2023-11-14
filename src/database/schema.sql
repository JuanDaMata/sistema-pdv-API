CREATE DATABASE pdv;

CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE categorias(
	id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL
);

CREATE TABLE produtos(
	id SERIAL PRIMARY KEY,
  descricao TEXT,
  quantidade_estoque INTEGER,
  valor INTEGER,
  categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE clientes(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  email TEXT UNIQUE NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  cep VARCHAR(8),
  rua TEXT,
  numero VARCHAR(15),
  bairro TEXT,
  cidade TEXT,
  estado VARCHAR(2)
);

INSERT INTO categorias (descricao) VALUES ('Informática'), ('Celulares'), ('Beleza e Perfumaria'),
('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');

ALTER TABLE produtos ADD COLUMN produto_imagem TEXT;

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  observacao TEXT,
  valor_total INTEGER
);

CREATE TABLE pedido_produtos (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id),
  produto_id INTEGER REFERENCES produtos(id),
  quantidade_produto INTEGER,
  valor_produto INTEGER
);