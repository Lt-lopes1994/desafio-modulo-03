const conexao=require('../conexao');

async function cadastrarTransacaoUsuario(req, res){
    const {usuario}=req;
    const {descricao, valor, data, categoria_id, tipo}=req.body;

    if(valor<=0){
        return res.status(400).json({mensagem: "O valor à ser tranferido, deve ser maior que zero"});
    }

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

async function listarTransacoesUsuario(req, res){
    const {usuario}=req;

    try {
        const queryConsultaTransacoes='select * from transacoes where usuario_id=$1';
        const consultaTransacoes=await conexao.query(queryConsultaTransacoes, [usuario.id]);

        const queryConsultaDescricao='select descricao from categorias where id=$1';

        const novoArrayDadosTransacao=[];

        for(let i=0;i<consultaTransacoes.rows.length;i++){
            novoArrayDadosTransacao.push({
              id: consultaTransacoes.rows[i].id,
              tipo: consultaTransacoes.rows[i].tipo,
              descricao: consultaTransacoes.rows[i].descricao,
              valor: consultaTransacoes.rows[i].valor,
              data: consultaTransacoes.rows[i].data,
              usuario_id: consultaTransacoes.rows[i].usuario_id,
              categoria_id: consultaTransacoes.rows[i].categoria_id,
              categoria_nome: (await conexao.query(queryConsultaDescricao, [consultaTransacoes.rows[i].categoria_id])).rows[0].descricao
            });
        }
        
        return res.status(200).json(novoArrayDadosTransacao);
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
        
        const queryConsultaDescricao='select descricao from categorias where id=$1';
        const consultaDescricao=await conexao.query(queryConsultaDescricao, [consultaTransacao.rows[0].categoria_id]);

        const novoDadosTransacao=consultaTransacao.rows[0];

        const novoObjetoDadosTransacao={
            id: novoDadosTransacao.id,
            tipo: novoDadosTransacao.tipo,
            descricao: novoDadosTransacao.descricao,
            valor: novoDadosTransacao.valor,
            data: novoDadosTransacao.data,
            usuario_id: novoDadosTransacao.usuario_id,
            categoria_id: novoDadosTransacao.categoria_id,
            categoria_nome: consultaDescricao.rows[0].descricao
        };
        
        return res.status(200).json(novoObjetoDadosTransacao);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

async function atualizarTransacaoUsuario(req, res){
    const {usuario}=req;
    const {id}=req.params;
    const {descricao, valor, data, categoria_id, tipo}=req.body;

    if(tipo!=='entrada' && tipo!=='saida'){
        return res.status(400).json({mensagem: "O campo tipo deve ser preenchido com a palavra 'entrada' ou 'saida' "});
    }

    try {
        const queryConsultaTransacao='select * from transacoes where id=$1 and usuario_id=$2';
        const consultaTransacao=await conexao.query(queryConsultaTransacao, [id, usuario.id]);

        if(consultaTransacao.rowCount===0){
            return res.status(404).json({mensagem: 'A transação não foi encontrada'});
        }

        const queryConsultaCategoria='select * from categorias where id=$1';
        const consultaCategoria=await conexao.query(queryConsultaCategoria, [categoria_id]);

        if(consultaCategoria.rowCount===0){
            return res.status(404).json({mensagem: 'O indentificador do campo categoria_id, não corresponde a nenhuma categoria válida.'});
        }

        const queryAtualizaTransacao=`
        update transacoes 
        set descricao=$1, valor=$2, data=$3, categoria_id=$4, tipo=$5 where id=$6`;
        const atualizaTransacao=await conexao.query(queryAtualizaTransacao, [descricao, valor, data, categoria_id, tipo, id]);

        if(atualizaTransacao.rowCount===0){
            return res.status(404).json({mensagem: 'Não foi possível atualizar a transação.'});
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

async function exclirTransacaoUsuario(req, res){
    const {usuario}=req;
    const {id}=req.params;

    try {
        const queryConsultaTransacao='select * from transacoes where id=$1 and usuario_id=$2';
        const consultaTransacao=await conexao.query(queryConsultaTransacao, [id, usuario.id]);

        if(consultaTransacao.rowCount===0){
            return res.status(404).json({mensagem: 'A transação não foi encontrada.'});
        }

        const queryTransacaoExcluida='delete from transacoes where id=$1';
        const transacaoExcluida=await conexao.query(queryTransacaoExcluida, [id]);

        if(transacaoExcluida.rowCount===0){
            return res.status(404).json('Não foi possível excluir a transação.');
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

async function obterExtratoTransacoesUsuario(req, res){
    const {usuario}=req;
    
    try {
        const queryConsultaSaida='select sum(valor) from transacoes where usuario_id=$1 and tipo=$2';
        const consultaSaida=await conexao.query(queryConsultaSaida, [usuario.id, 'saida']);

        const queryConsultaEntrada='select sum(valor) from transacoes where usuario_id=$1 and tipo=$2';
        const consultaEntrada=await conexao.query(queryConsultaEntrada, [usuario.id, 'entrada']);

        if(consultaSaida.rows[0].sum===null){
            consultaSaida.rows[0].sum=0;
        }

        if(consultaEntrada.rows[0].sum===null){
            consultaEntrada.rows[0].sum=0;
        }

        const objetoExtratoTransacoes={
            "entrada": parseInt(consultaEntrada.rows[0].sum, 10),
            "saida": parseInt(consultaSaida.rows[0].sum, 10)
        };

        return res.status(200).json(objetoExtratoTransacoes);
    } catch (error) {
        return res.status(500).json({mensagem: error.message}); 
    }
}

module.exports={
    listarTransacoesUsuario,
    detalharTransacaoUsuario,
    detalharTransacaoUsuario,
    cadastrarTransacaoUsuario,
    atualizarTransacaoUsuario,
    exclirTransacaoUsuario,
    obterExtratoTransacoesUsuario
}