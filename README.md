# **Upload de arquivos**

Back-end: NodeJS

Iniciando aplicação:
morgand: log de requisições http
multer: middleware para manipular requisições do tipo Multipart Form, que podem trazer arquivos
```
yarn init -y

yarn add express morgan mongoose multer

yarn add nodemon -D
```

Criar arquivos: index.js e routes.js

Configurando upload:

Fazendo upload localmente:
Criar arquivo: config/multer.js
Feito configurações e commit

Salvando no banco de dados mongoDB:
Criar arquivo models/Post.js
Ajustar dados no index e routes

Fazendo upload para amazon S3:

