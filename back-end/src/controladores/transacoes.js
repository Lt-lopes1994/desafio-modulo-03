const conexao=require('../conexao');
const bcrypt=require('bcrypt');

async function listarTransacoesUsuario(req, res){
    const {usuario}=req;

    try {
        // const queryConsultaUsuario='select * from usuarios where id=$1';
        // const consultaUsuario=await conexao.query(queryConsultaUsuario, [usuario.id]);

        // if(consultaUsuario.rowCount===0){
        //     return res.status(404).json({mensagem: 'O usuário não foi encontrado'});
        // }

        const queryConsultaTransacoes='select * from transacoes where usuario_id=$1';
        const consultaTransacoes=await conexao.query(queryConsultaTransacoes, [usuario.id]);

        return res.status(200).json(consultaTransacoes.rows);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

async function detalharTransacaoUsuario(req, res){
    const {usuario}=req;
    const {id}=req.params;

    try {
        const queryConsultaTransacao='select * from transacoes where id=$1 and usuario_id=$2';
        const consultaTransacao=await conexao.query(queryConsultaTransacao, [id, usuario.id]);

        if(consultaTransacao.rowCount===0){
            return res.status(404).json({mensagem: 'A transação não foi encontrada'});
        }
        
        return res.status(200).json(consultaTransacao.rows[0]);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

async function cadastrarTransacaoUsuario(req, res){
    const {usuario}=req;
    const {descricao, valor, data, categoria_id, tipo}=req.body;

    if(tipo!=='entrada' && tipo!=='saida'){
        return res.status(400).json({mensagem: "O campo tipo deve ser preenchido com a palavra 'entrada' ou 'saida' "});
    }

    try {
        const queryConsultaCategoria='select * from categorias where id=$1';
        const consultaCategoria=await conexao.query(queryConsultaCategoria, [categoria_id]);

        if(consultaCategoria.rowCount===0){
            return res.status(404).json({mensagem: 'O indentificador do campo categoria_id, não corresponde a nenhuma categoria válida.'});
        }

        const queryTransacaoInserida=`
        insert into transacoes(descricao, valor, data, categoria_id, usuario_id, tipo)
        values 
        ($1, $2, $3, $4, $5, $6)`;
        const transacaoInserida=await conexao.query(queryTransacaoInserida, [descricao, valor, data, categoria_id, usuario.id, tipo]);

        if(transacaoInserida.rowCount===0){
            return res.status(404).json({mensagem: 'Não foi possível efetuar a transação'});
        }

        const queryDadosTransacao='select * from transacoes where usuario_id=$1';
        const dadosTransacao=await conexao.query(queryDadosTransacao, [usuario.id]);

        // if(consultaCategoria.rowCount===0){
        //     return res.status(404).json({mensagem: 'O indentificador do campo categoria_id, não corresponde a nenhuma categoria válida.'});
        // }

        const queryConsultaDescricao='select descricao from categorias where id=$1';
        const consultaDescricao=await conexao.query(queryConsultaDescricao, [categoria_id]);

        const novoDadosTransacao=dadosTransacao.rows[dadosTransacao.rows.length-1];

        const novoObjetoDadosTransacao={
            id: novoDadosTransacao.id,
            tipo: novoDadosTransacao.tipo,
            descricao: novoDadosTransacao.descricao,
            valor: novoDadosTransacao.valor,
            data: novoDadosTransacao.data,
            usuario_id: novoDadosTransacao.usuario_id,
            categoria_id: novoDadosTransacao.categoria_id,
            categoria_nome: consultaDescricao.rows[0].descricao
        }
        
        return res.status(200).json(novoObjetoDadosTransacao);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

module.exports={
    listarTransacoesUsuario,
    detalharTransacaoUsuario,
    detalharTransacaoUsuario,
    cadastrarTransacaoUsuario
}