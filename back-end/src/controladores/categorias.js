const conexao=require('../conexao');

async function listarCategoriasUsuario(req, res){
    const {usuario}=req;

    try {
        const queryConsultaCategoriaId='select categoria_id from transacoes where usuario_id=$1';
        const consultaCategoriaId=await conexao.query(queryConsultaCategoriaId, [usuario.id]);

        const queryConsultaDescricao='select descricao from categorias where id=$1';

        const novoArrayDadosTransacao=[];

        let descricaoID=1;
        for(let i=0;i<consultaCategoriaId.rows.length;i++){
            novoArrayDadosTransacao.push({
              id: descricaoID++,
              categoria_nome: (await conexao.query(queryConsultaDescricao, [consultaCategoriaId.rows[i].categoria_id])).rows[0].descricao
            });
        }
        
        return res.status(200).json(novoArrayDadosTransacao);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

module.exports={
    listarCategoriasUsuario
}