const conexao=require('../conexao');
const bcrypt=require('bcrypt');

async function cadastrarUsuario(req, res){
    const {nome, email, senha}=req.body;

    try {
        const queryConsultaEmail='select * from usuarios where email=$1';
        const consultaEmail=await conexao.query(queryConsultaEmail, [email]);

        if(consultaEmail.rowCount>0){
            return res.status(404).json({mensagem: 'Já existe usuário cadastrado com o e-mail informado.'});
        }

        const senhaCriptografada=await bcrypt.hash(senha, 10);

        const queryUsuarioInserido='insert into usuarios(nome, email, senha) values($1, $2, $3)';
        const usuarioInserido=await conexao.query(queryUsuarioInserido, [nome, email, senhaCriptografada]);

        if(usuarioInserido.rowCount===0){
            return res.status(400).json({mensagem: 'Não foi possivel cadastrar o usuário'});
        }

        const queryConsultaUsuario='select * from usuarios where email=$1';
        const consultaUsuario=await conexao.query(queryConsultaUsuario, [email]);

        const {senha:_, ...dadosUsuario}=consultaUsuario.rows[0];

        return res.status(200).json(dadosUsuario);    
    } catch (error) {
        return res.status(500).json({mensagem: error.message});
    }
}

async function detalharUsuario(req, res){
    const {usuario}=req;

    try {
        const queryConsultaUsuario='select * from usuarios where id=$1';
        const consultaUsuario=await conexao.query(queryConsultaUsuario, [usuario.id]);

        if(consultaUsuario.rowCount===0){
            return res.status(404).json({mensagem: 'O usuário não foi encontrado.'});
        }

        return res.status(200).json(usuario);    
    } catch (error) {
        return res.status(500).json({mensagem: error.message});
    }
}

async function atualizarUsuario(req, res){
    const {nome, email, senha}=req.body;
    const {usuario}=req;

    try {
        const queryConsultaUsuario='select * from usuarios where id=$1';
        const consultaUsuario=await conexao.query(queryConsultaUsuario, [usuario.id]);

        if(consultaUsuario.rowCount===0){
            return res.status(404).json({mensagem: 'O usuário não foi encontrado.'});
        }
        
        const senhaCriptografada=await bcrypt.hash(senha, 10);

        const queryAtualizaUsuario='update usuarios set nome=$1, email=$2, senha=$3 where id=$4';
        const atualizaUsuario=await conexao.query(queryAtualizaUsuario, [nome, email, senhaCriptografada, usuario.id]);

        if(atualizaUsuario.rowCount===0){
            return res.status(404).json({mensagem: 'Não foi possível atualizar os dados do usuário'});
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(404).json({mensagem: 'Já existe usuário cadastrado com o e-mail informado.'});
    }
}


module.exports={
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}