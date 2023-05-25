import { PrismaClient } from "@prisma/client";
import gerarToken from "../Utils/jwt.js";

const prisma = new PrismaClient()


export const criarUsuario = async (req, res) => {

    const role = req.body.role == 'true' ? true : false

    const usuario = await prisma.User.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            role: role,
            perfil: {
                create: {
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    nascimento: req.body.nascimento,
                    bio: req.body.bio,
                    fotoPerfil: req.file.path
                }
            }
        }
    })


    const token = gerarToken(usuario)

    res.json({
        data: usuario,
        token: token,
        msg: "Usuário e perfil criados com sucesso!"
    })
}

export const login = async (req, res) => {
    const usuario = await prisma.User.findFirst({
        where: {
            AND: {
                email: req.body.email,
                senha: req.body.senha
            }
        }
    })

    if (usuario == null) {
        res.status(401).json({
            msg: "Email ou senha não conferem"
        })
    }
    const token = gerarToken(usuario)

    res.send({
        data: usuario,
        token: token,
        msg: "Login efetuado com sucesso!"
    })
}

export const atualizarUsuario = async (req, res) => {
    const usuario = await prisma.User.update({
        where: {
            id: parseInt(req.params.usuarioId)
        },
        data: {
            email: req.body.email,
            perfil: {
                update: {
                    nome: req.body.nome,
                    telefone: req.body.telefone,
                    nascimento: req.body.nascimento,
                    bio: req.body.bio,
                }
            }
            
        }
    })

    res.json({
        data: usuario,
        msg: "Usuário e perfil atualizados com sucesso!"
    })
}

export const getUsuarios = async (req, res) => {
    const usuarios = await prisma.User.findMany({
        where: {
            perfil: {
                nome: {
                    contains: req.query.nome
                } ,
                telefone: {
                    contains: req.query.telefone
                }
            },
        },
        include: {
            perfil: true
        }
    })

    res.json({
        data: usuarios,
        msg: "Usuários encontrados com sucesso!"
    })
}

export const getUsuarioPorId = async (req, res) => {
    const usuario = await prisma.User.findUnique({
        where: {
            id: parseInt(req.params.usuarioId)
        },
        include: {
            perfil: true
        }
    })
    res.json({
        data: usuario,
        msg: "Usuário encontrado com sucesso!"
    })
}

export const deletarUsuario = async (req, res) => {
    const perfilDeletado = await prisma.perfil.deleteMany({
        where: {
            usuario: {
                id: parseInt(req.params.usuarioId)
            }
        }
    })
    res.json({
        msg: "Usuário removido com sucesso!"
    })
}

export const alterarSenha = async (req, res) => {
    const { usuarioId } = req.params;
    const { senhaAntiga, senhaNova } = req.body;

    const id = parseInt(usuarioId); // Certifique-se de que o valor seja um número válido

  if (isNaN(id)) {
    res.status(400).json({
      msg: "O ID do usuário fornecido é inválido",
    });
    return;
  }

    const usuario = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
  
    if (!usuario) {
      res.status(404).json({
        msg: "Usuário não encontrado",
      });
      return;
    }
  
    if (usuario.senha !== senhaAntiga) {
      res.status(401).json({
        msg: "A senha antiga não corresponde à senha atual",
      });
      return;
    }
  
    await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        senha: senhaNova,
      },
    });
  
    res.json({
      msg: "Senha alterada com sucesso!",
    });
  };