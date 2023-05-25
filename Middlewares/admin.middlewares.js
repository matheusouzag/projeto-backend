import jwt from "jsonwebtoken";


export default function autorizarAdmin(req, res, next){
    const authHeader = req.headers['authorization']

if (authHeader == null){
    res.status(401).json({
        msg: "Você precisa ser um admin para este recurso"
    })
}

    const token = authHeader.split(' ')[1]

    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {

            const role = usuario.role
            
            if(err || role == false){
                return res.status(401).json({
                    msg: "Você precisa ser um admin para este recurso"
                })
            }

            next()
        })
    } else {
        return res.status(401).json({
            msg: "Você precisa ser um admin para este recurso"
        })
    }
}