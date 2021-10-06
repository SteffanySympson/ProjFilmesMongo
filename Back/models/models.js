//primeiro inicia  o mongoose
const mongoose = require('mongoose');

//monta a model
const filmeModel = new mongoose.Schema({
    "titulo": {type: String, require: true},
    "capa": {type: String, require: true},
    "genero": {type: String, require: true},
    "nota": {type: Number, require: true},
    "sinopse": {type: String, require: true},
    "dataCadastro": {type: Date, default: Date.now}
})

//agora joga o modelo/Schema numa constante pra poder exportar e usar fora desse arquivo
const Filme = mongoose.model("filmes", filmeModel);

//exportando...
module.exports = Filme;