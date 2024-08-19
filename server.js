import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/user', async (req, res) => {                // req = request res = response

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            cpf: req.body.cpf
        }
    })

    res.status(201).json(req.body)

})

app.get('/user', async (req, res) => {

        let users = []

    if(req.query){
        users = await prisma.user.findMany({

            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
                cpf: req.query.cpf
            }
        })
    }else{
        
        users = await prisma.user.findMany()

    }

    res.status(200).json(users)
})

app.put('/user/:cpf', async (req, res) => {

    await prisma.user.update({
        where: {

            cpf: req.params.cpf

        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body)

})

app.delete('/user/:cpf', async (req, res) => {

    await prisma.user.delete ({
        where: {
            cpf: req.params.cpf

        }
    })
    res.status(200).json({ message: "Usuário deletado com Sucesso!" })
})


app.listen(3000)
