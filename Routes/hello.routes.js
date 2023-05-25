import express from "express";
import * as helloController from '../Controllers/hello.controllers.js'

const router = express.Router()

router.get('/hello', helloController.hello)
router.get('/hello/mundo', helloController.olaMundo)

export default router