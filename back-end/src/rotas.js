const express=require('express');
const usuarios=require('./controladores/usuarios');

const rotas=express();

//rotas
rotas.post('/usuarios', usuarios.cadastrarUsuario);

module.exports=rotas;