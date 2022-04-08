const conexao=require('../conexao');
const bcrypt=require('bcrypt');

async function cadastrarUsuario(req, res){
    const {nome, email, senha}=req.body;

    if(!nome){
        return res.status(404).json('O campo nome é obrigatório');
    }

    if(!email){
        return res.status(404).json('O campo email é obrigatório');
    }

    if(!senha){
        return res.status(404).json('O campo senha é obrigatório');
    }

    try {
        const queryConsultaEmail='select * from usuarios where email=$1';
        const consultaEmail=await conexao.query(queryConsultaEmail, [email]);

        if(consultaEmail.rowCount>0){
            return res.status(404).json({mensagem: "Já existe usuário cadastrado com o e-mail informado."});
        }

        const senhaCriptografada=await bcrypt.hash(senha, 10);

        const queryUsuarioInserido='insert into usuarios(nome, email, senha) values($1, $2, $3)';
        const usuarioInserido=await conexao.query(queryUsuarioInserido, [nome, email, senhaCriptografada]);

        if(usuarioInserido.rowCount===0){
            return res.status(400).json('Não foi possivel cadastrar o usuário');
        }

        const queryConsultaUsuario='select * from usuarios where email=$1';
        const consultaUsuario=await conexao.query(queryConsultaUsuario, [email]);

        const {senha:_, ...dadosUsuario}=consultaUsuario.rows[0];

        return res.status(200).json(dadosUsuario);    
    } catch (error) {
        return res.status(500).json({mensagem: error.message});
    }
}


module.exports={
    cadastrarUsuario
}