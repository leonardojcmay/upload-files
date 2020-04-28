const routes = require('express').Router();
const multer = require('multer'); // Importando multer
const multerConfig = require('./config/multer');

// importando model/Post
const Post = require('./models/Post');

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => { // multer é um middleware, utilizando single, pois irá ser feito um upload de um arquivo por vez
    // console.log(req.file); // req.file é onde o multer joga as informações do arquivo, e é estas informações que serão armazenadas no banco de dados

    // Inserindo no banco de dados
    const { originalname: name, size: size, filename: key } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    });

    return res.json(post);
});

// exportando as rotas
module.exports = routes;