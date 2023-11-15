var jwt = require('jsonwebtoken')

module.exports = {
    validarToken: async function(req, res, next) {
        let token = req.headers['authorization']
        if (!token)
            token = ''
        token = token.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                res.status(403).json("Acesso negado - Token invalido")
                return
            }
            req.codigoLogado = payload.codigoLogado
            next()
        })
    },

}