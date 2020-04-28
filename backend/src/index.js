const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // fazendo com que o express consiga lidar com json
app.use(express.urlencoded({ extended: true })); // fazendo com que o express consiga lidar com requisiçoes url encoded, facilita na parte de envio de arquivos
app.use(morgan('dev')); // lib de log

app.use(require("./routes"));

app.listen(3000);