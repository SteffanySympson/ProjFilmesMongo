//-------Configurações do Back-------
const mongoose = require('mongoose'); //importa o mongoose
const express = require('express'); //importa o express
const cors = require('cors'); //importa o cors

const app = express(); //inicializa o expressa
app.use(express.json()); //pede pro express usar o formato json
app.use(cors()); //ativa o cors

const port = 3000; //definindo a porta
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`); //escuta a porta
})

//---------Configs do Banco -------
const Filme = require('./models/models'); //importando a model
const Conn = require('./conn/conn'); //importando a conexão 
Conn(); //acionando ela

//-------------CRUD---------------

//GET
app.get('/filmeslist', (req, res) => {
    Filme.find({})
    .then((Filmes) => {
        console.log(filmes);
        res.send(filmes);
    })
    .catch((err) => {
        console.log(err);
    })
})

//GET com async e await e tratamento de erros inicial
app.get('/filmes', async (req, res) => {
    try{
        const filmes = await Filme.find();
        console.log(filmes);
        res.send(filmes);
    }catch(error){
        console.log(error);
    }
})

//GET por id
app.get('/filmes/findById/:id', async (req, res) => {
    const filmeById = await Filme.findOne({_id: req.params.id})
    res.send(filmeById);
})

//GET por título
app.get('/filmes/findTitulo/:titulo', async (req, res) => {
    const filmeTitulo = await Filme.find({titulo: req.params.titulo})
    res.send(filmeTitulo);
})

//DELETE por ID
app.delete('/filmes/delete/:id', async (req, res) => {
    await Filme.deleteOne({_id: req.params.id})
    res.status(200).send({
        message:'Filme deletado com sucesso!',
    })
})

//POST
app.post('/filmes/add', async (req, res) => {
    await Filme.create(req.body)
    .then(() => {
        res.status(200).send({
            message: 'Filme adicionado com sucesso!',
        })
    })
    .catch((err) => {
        res.status(400).send({
            error: 'Algo deu errado, verifique e tente novamente.',
        })
        console.log(err);
    })
})

//PUT atualizando de acordo com id e body
app.put('/filmes/update/:id', async (req, res) => {
    await Filme.updateOne({_id: req.params.id}, req.body)
    .then(() => {
        res.status(200).send({
            message: 'Filme atualizado com sucesso',
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({
            error: err
        })
    })
})