require("dotenv").config(); // fazendo com que o node leia as variaveis descritas no .env

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose"); // Banco de dados mongoDb: manipulando os dados
const path = require("path") // utilizando para poder acessar pasta onde é salva as imagens localmente

const app = express();

// Configurando banco de dados
mongoose.connect('mongodb://localhost:27017/upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // fazendo com que o express consiga lidar com json
app.use(express.urlencoded({ extended: true })); // fazendo com que o express consiga lidar com requisiçoes url encoded, facilita na parte de envio de arquivos
app.use(morgan('dev')); // lib de log
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))) // fazendo com que consiga acessar a pastas onde os arquivos estão salvos localmente

app.use(require("./routes"));

app.listen(3000);