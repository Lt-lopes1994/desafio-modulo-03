const conexao=require('../conexao');
const bcrypt=require('bcrypt');

async function listarCategoriasUsuario(req, res){

    try {
        const queryConsultaCategorias='select * from categorias';
        const consultaCategorias=await conexao.query(queryConsultaCategorias);

        return res.status(200).json(consultaCategorias.rows);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

module.exports={
    listarCategoriasUsuario
}