import express from "express";
import multer from 'multer';
import path from 'path'
import * as usuarioController from '../controllers/usuario.controllers.js'
import autorizarAdmin from "../Middlewares/admin.middlewares.js";
import autorizarUsuario from "../Middlewares/auth.middlewares.js";

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file))
    }
})

const router = express.Router()
const upload = multer({storage: storage})

// CRUD
// Criar, atualizar, remover, retornar usuários, retornar usuario por id

router.post('/', upload.single('foto_perfil'), usuarioController.criarUsuario)

router.post('/login', usuarioController.login)

router.put('/alterar-senha/:usuarioId', usuarioController.alterarSenha)

router.put('/:usuarioId', usuarioController.atualizarUsuario)

router.delete('/:usuarioId', usuarioController.deletarUsuario)

router.get('/', usuarioController.getUsuarios)

router.get('/:usuarioId', usuarioController.getUsuarioPorId)




export default router