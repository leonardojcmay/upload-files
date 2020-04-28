const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // Banco de dados mongoDb: manipulando os dados

const app = express();

// Configurando banco de dados
mongoose.connect('mongodb://localhost:27017/upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // fazendo com que o express consiga lidar com json
app.use(express.urlencoded({ extended: true })); // fazendo com que o express consiga lidar com requisiçoes url encoded, facilita na parte de envio de arquivos
app.use(morgan('dev')); // lib de log

app.use(require("./routes"));

app.listen(3000);