const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require("aws-sdk");
const multerS3 = require('multer-s3');

// configurações do storage para o s3
const storageTypes = {
    // storage de tipo local
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        }, // Mesma informação que esta no dest . Somente uma forma de garantir 
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                // Se der erro
                if (err) cb(err);

                // Se der certo
                file.key = `${hash.toString('hex')}-${file.originalname}`; // convertendo os bytes que gerarm no crypto para hexadecimal(letras e numeros). originalname é o nome do arquivo original

                cb(null, file.key); // primeiro parametro null pois nao deu erro e depois o filename gerado
            });
        }, // Ajustando o nome da imagem, para que não ocorra imagens com o mesmo nome
    }),
    // storage do tipo s3
    s3: multerS3({
        s3: new aws.S3(), // Vai ler todas informações que estão no arquivo .env
        bucket: "uploadfilesrs", // Nome do bucket criado na aws
        contentType: multerS3.AUTO_CONTENT_TYPE, // contentType serve para quando o usuario de fora tentar acessar o arquivo, efetue automaticamente o download. multerS3.AUTO_CONTENT_TYPE vai ler o type do arquivo e informar ao navegador que pode ser aberto o arquivo em tela, assim não forçando ele a fazer o download
        acl: "public-read", // permissão para que todos os arquivos que sejam feitos uploads, todos possam acessar
        key: (req, file, cb) => { // é igual o filename do diskStorage
            crypto.randomBytes(16, (err, hash) => {
                // Se der erro
                if (err) cb(err);

                // Se der certo
                const filename = `${hash.toString('hex')}-${file.originalname}`; // convertendo os bytes que gerarm no crypto para hexadecimal(letras e numeros). originalname é o nome do arquivo original

                cb(null, filename); // primeiro parametro null pois nao deu erro e depois o filename gerado
            });
        }
    }),
};

// Exportando configurações do multer
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), // Destino dos arquivos assim que for feito o upload. __dirname se refere ao diretório config. E direcionando para pasta uploads
    storage: storageTypes[process.env.STORAGE_TYPE], // direciona onde quer salvar o arquivo s3 ou local
    limits: { // Determinando limiter para o arquivo. Exemplo limitando arquivo no maximo de 2mb ou se o usuario pode fazer no maximo 5 uploads por vez
        fileSize: 2 * 1024 * 1024, // Limite de tamanho do arquivo
    },
    fileFilter: (req, file, cb) => { // Filtrar upload de arquivos. cb callback função que ira chamar assim que finalizar a verificação
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        // Se der certo retorna true
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else { // Se não, retornar um erro
            cb(new Error('Invalid file type'))
        }
    },
};