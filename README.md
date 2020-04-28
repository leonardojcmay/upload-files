# **Upload de arquivos**

**Back-end: NodeJS**

Iniciando aplicação:
<br>**morgand:** log de requisições http
<br>**multer:** middleware para manipular requisições do tipo Multipart Form, que podem trazer arquivos
```
yarn init -y

yarn add express morgan mongoose multer

yarn add nodemon -D
```

Criar arquivos: index.js e routes.js

---

**Configurando upload:**

Fazendo upload localmente:
<br>Criar arquivo: config/multer.js
<br>Feito configurações e commit das modificações

Salvando no banco de dados mongoDB:
<br>Criar arquivo models/Post.js
<br>Ajustar dados no index e routes
<br>Feito configurações e commit das modificações

Fazendo upload para amazon s3:
<br>Criar bucket na aws s3
<br>**multer-s3:** auxilia no processo para salvar na aws
<br>**aws-sdk:** contém toda configuração que é necessária para integração com o s3
```
yarn add multer-s3

yarn add aws-sdk
```

Ajustado informações no arquivo .env
<br>AWS_ACCES_KEY_ID
<br>AWS_SECRET_ACCESS_KEY
<br>AWS_DEFAULT_REGION

**dotenv:** utilizada para orquestrar as variáveis ambiente de um projeto
```
yarn add dotenv
```

**Funcionalidades:**
<br>- GET: Lista de todos os posts
<br>- POST: Cadastrando arquivo local ou s3
<br>- DELETE: Deletando arquivo local ou s3
