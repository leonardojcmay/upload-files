const routes = require('express').Router();
const multer = require('multer'); // Importando multer
const multerConfig = require('./config/multer');

// importando model/Post
const Post = require('./models/Post');

// Listando arquivos
routes.get('/posts', async (req, res) => {
    const posts = await Post.find(); // buscando todos os posts

    return res.json(posts);
});

// Cadastrando arquivo
routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => { // multer é um middleware, utilizando single, pois irá ser feito um upload de um arquivo por vez
    // console.log(req.file); // req.file é onde o multer joga as informações do arquivo, e é estas informações que serão armazenadas no banco de dados

    // Inserindo no banco de dados
    const { originalname: name, size: size, key, location: url = "" } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url,
    });

    return res.json(post);
});

// Deletando arquivo de acordo com o id
routes.delete('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id); // Buscando o id que foi informado na route 

    // deletando arquivo
    await post.remove();

    return res.send();
});

// exportando as rotas
module.exports = routes;