// definindo a tabela do banco de dados
const mongoose = require("mongoose");
// pacote utilizado para excluir imagem no s3
const aws = require("aws-sdk");
const fs = require("fs"); // deletar, ler, criar arquivo
const path = require("path"); // chegar ate o arquivo
const { promisify } = require("util"); // converte uma função em promises

const s3 = new aws.S3(); // Irá ler as variaveis de ambiente, para ter acesso

const PostSchema = new mongoose.Schema({
    name: String, // nome original da imagem
    size: Number, // tamanho da imagem
    key: String, // nome da imagem com o hash gerado
    url: String, // url que a imagem esta contida
    createdAt: { // data que o arquivo foi criado
        type: Date,
        default: Date.now,
    },
});

// Toda vez antes de salvar o post no banco de dados, verificar se url estiver vazia quer dizer que estara salvando localmente
// antes de salvar quer executar uma função
PostSchema.pre('save', function () {
    // Se não tiver nada na url
    if (!this.url) {
        // Informando a url para colocar
        //this.url = `${process.env.APP_URL}/files/${this.key}`; 
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

// Antes de ocorrer a remoção do registro no banco de dados, efetuar a exclusão na aws
PostSchema.pre("remove", function () {
    // verificar se esta utilizando a base de dados s3
    if (process.env.STORAGE_TYPE === "s3") {
        return s3.deleteObject({
            Bucket: "uploadfilesrs",
            Key: this.key
        }).promise(); // retornando no formato de promise
    } else { // Se não estiver utilizando o s3, tem que deletar o arquivo que esta armazenado localmente
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)) // fs.unlink funçao de deletar um arquivo. path.resolve chegando no caminho do arquivo
    }
});

module.exports = mongoose.model("Post", PostSchema);