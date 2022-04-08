const conexao=require('../conexao');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const segredo=require('../segredo');

async function logarUsuario(req, res){
    const {email, senha}=req.body;

    if(!email || !senha){
        return res.status(404).json('Email e senha são obrigatórios.');
    }

    try {
        const queryVerificaEmail='select * from usuarios where email=$1';
        const usuarioEmail=await conexao.query(queryVerificaEmail, [email]);

        if(usuarioEmail.rowCount===0){
            return res.status(404).json('Usuário não encontrado');
        }

        const usuario=usuarioEmail.rows[0];

        const senhaVerificada=await bcrypt.compare(senha, usuario.senha);

        if(!senhaVerificada){
            return res.status(400).json("Email e/ou senha incorreto(s).");
        }

        const token = jwt.sign(
            {id: usuario.id}, 
            segredo, {
            expiresIn: "5d"
        });

        const dadosUsuario={
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(500).json({mensagem: error.message});  
    }
}

module.exports={
    logarUsuario
}