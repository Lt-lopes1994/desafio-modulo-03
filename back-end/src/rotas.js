const express=require('express');
const usuarios=require('./controladores/usuarios');

const rotas=express();

//rotas
rotas.post('/usuario', usuarios.cadastrarUsuario);

module.exports=rotas;