# START-PROJECT

- 1 - Instalação
    - 1.1 - Instalando
    - 1.2 - Executando
- 2 - Como usar a classe de banco de dados
- 3 - Authorization Header
- 4 - Enum's
- 5 - Como usar

- 5.1 - AUTENTICAÇÃO E UPLOAD

|#|Método|Rota|Descrição|
|---|---|---|---|
|5.1.1|POST|/api/auth| Rota para autenticação|
|5.1.2|POST|/api/validartoken| Rota para validar autenticação via token|
|5.1.3|POST|/api/upload| Rota para upload de arquivos e imagens|
|5.1.4|DELETE|/api/upload/:arquivo| Rota para excluir arquivo|

## 1 - Instalação

### 1.1 - Instalando

Execute no terminal dentro da pasta api

```
npm install
```

### 1.2 - Executando

Execute no terminal dentro da pasta api

```
npm start
```

## 2 - Como usar a classe de banco de dados

Odin API usa Knex para realizar a manipulação do banco de dados. 
Mais informações sobre o Knex podem ser encontradas em: http://knexjs.org/

## 3 - Authroziation Header

Para autorizar as requisições devemos enviar o token fornecido nas rotas de autenticação 
no cabeçalho da requisição. Deve ser enviado como no exemplo abaixo: 

```
AUTHORIZATION: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## 4 - Enum's



## 5 - Como Usar

## 5.1 - AUTENTICAÇÃO E UPLOAD

### 5.1.1 - POST /api/auth

|Parâmetro|Obrigatório|Valor default|Descrição|
|---|---|---|---|
|tx_email|sim|-|-|
|tx_senha|sim|-|-|

Retorno esperado (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

### 5.1.2 - POST /api/validartoken

Retorno esperado (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

### 5.1.3 - POST /api/upload

|Parâmetro|Obrigatório|Valor default|Descrição|
|---|---|---|---|
|file|sim|-|-|

Retorno esperado (200)

```JAVASCRIPT
[
    "/upload/AIe2A_20171004_214538.jpg"
]
```

Exemplo AJAX
```JAVASCRIPT
var form = new FormData();
form.append("file", "image.jpg");

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:7100/api/upload",
    "method": "POST",
    "headers": {
        "authorization": "7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78",
        "cache-control": "no-cache",
        "postman-token": "37620e8d-83f8-97c3-bd4b-d85616dc5608"
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```