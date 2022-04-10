const jwt=require('jsonwebtoken');
const segredo=require('../segredo');
const conexao=require('../conexao');

async function autenticarLogin(req, res, next){
    const {authorization}=req.headers;

    if(!authorization){
        return res.status(401).json({
            mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."
        });
    }

    try {
        const token=authorization.replace('Bearer', '').trim();

        const {id}=jwt.verify(token, segredo);

        const queryConsultaId='select * from usuarios where id=$1';
        const consultaId=await conexao.query(queryConsultaId, [id]);

        if(consultaId.rowCount===0){
            return res.status(404).json({mensagem: "O usuário não foi encontrado"});
        }

        const {senha, ...usuario}=consultaId.rows[0];

        req.usuario=usuario;

        next();
    } catch (error) {
        return res.status(500).json({mensagem: error.message});
    }
}

module.exports={
    autenticarLogin
}