//importando mongoose 
const mongoose = require('mongoose');

//configuração de conexão
const Conn = () => {
     mongoose.connect('mongodb://localhost:27017/filmes', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
     }).then(() => {
         console.log('Conectado com o Mongo ;)')
     }).catch((err) => {
         console.log(err)
     });
};

//exporta a conexão
module.exports = Conn;