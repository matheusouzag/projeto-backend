import express from 'express'
import helloRouter from './Routes/hello.routes.js'
import categoriaRouter from './Routes/categorias.routes.js'
import usuarioRouter from './Routes/usuario.routes.js'
import postagemRouter from './Routes/postagem.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/public', express.static('public'))

app.use('/', helloRouter)
app.use('/categorias', categoriaRouter)
app.use('/usuarios', usuarioRouter)
app.use('/postagens', postagemRouter)

app.listen(port, () => {
    console.log(`A nossa API está rodando na porta ${port}`)
})