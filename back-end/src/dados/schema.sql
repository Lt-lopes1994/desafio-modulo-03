create database dindin;

create table if not exists usuarios(
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);

create table if not exists categorias(
    id serial primary key,
    descricao text 
);

create table if not exists transacoes(
    id serial primary key,
    descricao text,
    valor integer not null,
    data timestamptz not null,
    categoria_id integer not null,
    usuario_id integer not null,
    tipo text not null,
    foreign key (categoria_id) references categorias (id),
    foreign key (usuario_id) references usuarios (id)
);

insert into categorias(descricao)
values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');