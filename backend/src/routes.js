const routes = require('express').Router();
const multer = require('multer'); // Importando multer
const multerConfig = require('./config/multer');

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => { // multer é um middleware, utilizando single, pois irá ser feito um upload de um arquivo por vez
    console.log(req.file); // req.file é onde o multer joga as informações do arquivo, e é estas informações que serão armazenadas no banco de dados

    return res.json({ hello: 'World' })
});

// exportando as rotas
module.exports = routes;