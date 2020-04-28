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
Upload para a própria pasta do projeto
Criar arquivo: config/multer.js
