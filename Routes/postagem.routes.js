import express from 'express'
import * as postagemController from '../Controllers/postagem.controllers.js'

const router = express.Router()

router.post('/', postagemController.criarPostagem)

router.put('/:postagemId', postagemController.atualizarPostagem)

router.get('/', postagemController.getPostagens)

router.get('/:postagemId', postagemController.getPostagensPorId)

router.delete('/:postagemId', postagemController.deletarPostagem)

export default router
