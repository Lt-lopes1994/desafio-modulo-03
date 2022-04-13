
async function validarCampos(req, res, next){
    const {nome, email, senha}=req.body;

    if(!nome){
        return res.status(400).json({mensagem: "O campo nome é obrigatório"});
    }

    if(!email){
        return res.status(400).json({mensagem: "O campo email é obrigatório"});
    }

    if(!senha){
        return res.status(400).json({mensagem: "O campo senha é obrigatório"});
    }

    next();
}

async function validarCampos2(req, res, next){
    const {descricao, valor, data, categoria_id, tipo}=req.body;

    if(!descricao){
        return res.status(400).json({mensagem: "O campo descrição é obrigatório"});
    }

    if(!valor){
        return res.status(400).json({mensagem: "O campo valor é obrigatório"});
    }

    if(!data){
        return res.status(400).json({mensagem: "O campo data é obrigatório"});
    }

    if(!categoria_id){
        return res.status(400).json({mensagem: "O campo categoria_id é obrigatório"});
    }

    if(!tipo){
        return res.status(400).json({mensagem: "O campo tipo é obrigatório"});
    }

    next();
}

module.exports={
    validarCampos,
    validarCampos2
}