// CRUD (create, read, delete)

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getCategorias = async (req, res) => {
    const categorias = await prisma.categoria.findMany()

    res.json({
        data: categorias,
        msg: "Categorias encontradas com sucesso!"
    })
}

export const criarCategoria = async (req, res) => {
    const categoria = await prisma.categoria.create({
        data: {
            nome: req.body.nome
        }
    })

    res.json({
        data: categoria,
        msg: "Categoria criada com sucesso!"
    })
}

export const deletarCategoria = async (req, res) => {
    const categoria = await prisma.categoria.delete({
        where: {
            id: parseInt(req.params.categoriaId)
        }
    })

    res.json({
        msg: "Categoria removida com sucesso!"
    })
}