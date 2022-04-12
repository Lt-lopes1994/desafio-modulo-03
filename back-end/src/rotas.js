const express=require('express');
const usuarios=require('./controladores/usuarios');
const acesso=require('./controladores/acesso');
const autenticaLogin=require('./intermediarios/autenticaLogin');
const validaCampo=require('./intermediarios/validaCampo');
const categorias=require('./controladores/categorias');
const transacoes=require('./controladores/transacoes');

const rotas=express();

rotas.post('/login', acesso.logarUsuario);

rotas.post('/usuario', validaCampo.validarCampos, usuarios.cadastrarUsuario);

rotas.get('/usuario', autenticaLogin.autenticarLogin, usuarios.detalharUsuario);
rotas.put('/usuario', autenticaLogin.autenticarLogin, validaCampo.validarCampos, usuarios.atualizarUsuario);

rotas.get('/categoria', autenticaLogin.autenticarLogin, categorias.listarCategoriasUsuario);

rotas.post('/transacao', autenticaLogin.autenticarLogin, validaCampo.validarCampos2, transacoes.cadastrarTransacaoUsuario);
rotas.get('/transacao', autenticaLogin.autenticarLogin, transacoes.listarTransacoesUsuario);
rotas.get('/transacao/extrato', autenticaLogin.autenticarLogin, transacoes.obterExtratoTransacoesUsuario);
rotas.get('/transacao/:id', autenticaLogin.autenticarLogin, transacoes.detalharTransacaoUsuario);
rotas.put('/transacao/:id', autenticaLogin.autenticarLogin, validaCampo.validarCampos2, transacoes.atualizarTransacaoUsuario);
rotas.delete('/transacao/:id', autenticaLogin.autenticarLogin, transacoes.exclirTransacaoUsuario);


module.exports=rotas;