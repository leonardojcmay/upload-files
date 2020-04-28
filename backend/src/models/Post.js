// definindo a tabela do banco de dados
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String, // nome original da imagem
    size: Number, // tamanho da imagem
    key: String, // nome da imagem com o hash gerado
    url: String, // url que a imagem esta contida
    createdAt: { // data que o arquivo foi criado
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Post", PostSchema);