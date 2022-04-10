const express=require('express');
const usuarios=require('./controladores/usuarios');
const acesso=require('./controladores/acesso');
const autenticaLogin=require('./intermediarios/autenticaLogin');
const validaCampo=require('./intermediarios/validaCampo');
const categorias=require('./controladores/categorias');
const transacoes=require('./controladores/transacoes');

const rotas=express();

//login
rotas.post('/login', acesso.logarUsuario);
//cadastro de usuário
rotas.post('/usuario', validaCampo.validarCampos, usuarios.cadastrarUsuario);
//autenticação de usuário
rotas.get('/usuario', autenticaLogin.autenticarLogin, usuarios.detalharUsuario);
rotas.put('/usuario', autenticaLogin.autenticarLogin, validaCampo.validarCampos, usuarios.atualizarUsuario);
//listagem de categorias
rotas.get('/categoria', categorias.listarCategoriasUsuario);
//transações
rotas.get('/transacao', autenticaLogin.autenticarLogin, transacoes.listarTransacoesUsuario);
rotas.get('/transacao/:id', autenticaLogin.autenticarLogin, transacoes.detalharTransacaoUsuario);
rotas.post('/transacao', autenticaLogin.autenticarLogin, validaCampo.validarCampos2, transacoes.cadastrarTransacaoUsuario);


module.exports=rotas;