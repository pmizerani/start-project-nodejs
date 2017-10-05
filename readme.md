# Start-Project

### [Documentation](docs/)

- 1 - Setup
    - 1.1 - Installing
    - 1.2 - Running
- 2 - How to use the database class
- 3 - Authorization Header
- 4 - Labels
- 5 - Usage
    - 5.1 - AUTH
        - 5.1.1 - POST /api/auth
        - 5.1.2 - POST /api/auth/admin
    - 5.2 - USER
        - 5.2.1 - POST /api/user
        - 5.2.2 - GET /api/checkemail/:email
        - 5.2.3 - GET /api/user/:id
        - 5.2.4 - DELETE /api/user/:id
        - 5.2.5 - PUT /api/user
        - 5.2.6 - GET /api/user
    - 5.3 - COUNTRY / STATE PROVINCE / CITY
        - 5.3.1 - GET /api/country
        - 5.3.2 - GET /api/stateprovince/:id_country
        - 5.3.3 - GET /api/city/:id_state
    - 5.4 - FAQ
        - 5.4.1 - GET /api/faq
        - 5.4.2 - GET /api/faq/:id
        - 5.4.3 - DELETE /api/faq/:id
        - 5.4.4 - POST /api/faq
        - 5.4.5 - PUT /api/faq
    - 5.5 - USER_NOTIFICATION
        - 5.5.1 - GET /api/usernotification/:id_user/:status?
        - 5.5.2 - DELETE /api/usernotification/:id
        - 5.5.3 - POST /api/usernotification
        - 5.5.4 - PUT /api/usernotification
    - 5.6 - RL_USER_VISIT / RL_USER_FAVORITE / RL_USER_LIKE
        - 5.6.1 - POST /api/uservisit
        - 5.6.2 - POST /api/userfavorite
        - 5.6.3 - POST /api/userlike
        - 5.6.4 - GET /api/uservisit/:id_visited_user
        - 5.6.5 - GET /api/userfavorite/:id_favorite_user
        - 5.6.6 - GET /api/userlike/:id_liked_user
        - 5.6.7 - GET /api/userfavorite/user/:id_user
        - 5.6.8 - GET /api/userlike/user/:id_user
        - 5.6.9 - DELETE /api/userfavorite/:id_user/:id_favorite_user
        - 5.6.10 - DELETE /api/userlike/:id_user/:id_liked_user
    - 5.7 - UPLOAD
        - 5.7.1 - POST /api/upload

## 1 - Setup

### 1.1 - Installing

Run in the command line

```
npm install
```

### 1.2 - Running

Run in the command line

```
npm start
```

## 2 - How to use the database class

Start-Project uses Knex for the database manipulation. You can find more information
about Knex here: http://knexjs.org/

## 3 - Authroziation Header

To authorize the request we have to send the token given on the authentication routes
on the request Header. It should be written as below.

```
AUTHORIZATION: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## 4 - Labels

- 1 - Table user 
    - 1.1 - Field 'profile'
        - D - Donor
        - R - Receiver
        - O - Operator
        - P - Partner
    - 1.2 - Field 'newsletter_terms'
        - 0 - No
        - 1 - Yes
- 2 - Table testmonials 
    - 2.1 - Field 'status'
        - A - Aproved
        - P - Pending
        - R - Reject
- 3 - Table user_notification 
    - 3.1 - Field 'status'
        - 0 - No
        - 1 - Yes

## 5 - Usage

### 5.1 - AUTH

#### 5.1.1 - POST /api/auth

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|email|yes|-|-|
|password|yes|-|-|

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

#### 5.1.2 - POST /api/auth/admin

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|email|yes|-|-|
|password|yes|-|-|

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

### 5.2 - USER

#### 5.2.1 - POST /api/user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_city|no|-|-|
|name|yes|-|-|
|email|yes|-|-|
|password|yes|-|-|
|birthdate|no|-|Format "YYYY-MM-DD"|
|cpf|no|-|-|
|profile|yes|-|-|
|phone|no|-|-|
|photo|no|-|-|
|id_facebook|no|-|-|


HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

#### 5.2.1 - POST /api/user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_city|no|-|-|
|name|yes|-|-|
|email|yes|-|-|
|password|yes|-|-|
|birthdate|no|-|Format "YYYY-MM-DD"|
|cpf|no|-|-|
|profile|yes|-|-|
|phone|no|-|-|
|photo|no|-|-|
|id_facebook|no|-|-|


HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

#### 5.2.2 - GET /api/checkemail/:email

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|email|yes|-|-|

HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
{
    "id": 1,
    "id_city": 1,
    "name": "Name Lastname",
    "email": "email@gmail.com",
    "password": "2fcf1aab83a0",
    "birthdate": "1990-09-26T03:00:00.000Z",
    "created_date": "2017-09-26T03:00:00.000Z",
    "cpf": "37373773773",
    "profile": "D",
    "phone": "(37) 99999-9999",
    "photo": "",
    "id_facebook": "1asfd21asd51fas1fasd21f"
}
```

#### 5.2.3 - GET /api/user/:id

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|

Expected Return (200)

```JAVASCRIPT
{
    "id": 1,
    "id_city": 1,
    "name": "Name Lastname",
    "email": "email@gmail.com",
    "password": "2fcf1aab83a0",
    "birthdate": "1991-09-26T03:00:00.000Z",
    "created_date": "2017-09-26T03:00:00.000Z",
    "cpf": "31313113131",
    "profile": "D",
    "phone": "(37) 99999-9999",
    "photo": null,
    "id_facebook": "32a1df2a1s3df21as2df1",
    "id_user": null,
    "skin_color": null,
    "father_skin_color": null,
    "mother_skin_color": null,
    "brother_skin_color": null,
    "eye_color": null,
    "hair_color": null,
    "hair_texture": null,
    "mother_hair_texture": null,
    "father_hair_texture": null,
    "brother_hair_texture": null,
    "blood_type": null,
    "stature": null,
    "breed": null,
    "mother_breed": null,
    "father_breed": null,
    "brother_breed": null,
    "formation": null,
    "weight": null,
    "ethnic_origin": null,
    "city_name": "Divinópolis",
    "state_province_id": 1,
    "state_province_name": "Minas Gerais",
    "country_id": 1,
    "country_name": "Brasil"
}
```

#### 5.2.4 - DELETE /api/user/:id

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

#### 5.2.5 - PUT /api/user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_city|no|-|-|
|name|yes|-|-|
|email|yes|-|-|
|password|yes|-|-|
|birthdate|no|-|Format "YYYY-MM-DD"|
|cpf|no|-|-|
|profile|yes|-|-|
|phone|no|-|-|
|photo|no|-|-|
|id_facebook|no|-|-|
|user_information|yes|-|Object 'user_information'|

```JAVASCRIPT
user_information {
    id_user: {Number},
    skin_color: {Number},
    father_skin_color: {Number},
    mother_skin_color: {Number},
    brother_skin_color: {Number},
    eye_color: {Number},
    hair_color: {Number},
    hair_texture: {Number},
    mother_hair_texture: {Number},
    father_hair_texture: {Number},
    brother_hair_texture: {Number},
    blood_type: {Number},
    stature: {Number},
    breed: {Number},
    mother_breed: {Number},
    father_breed: {Number},
    brother_breed: {Number},
    formation: {Number},
    weight: {Number},
    ethnic_origin: {Number},
}
```

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```

#### 5.2.6 - GET /api/user

|Parameters|Required|Default Value|Description|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_city": null,
        "name": "Name",
        "email": "email@gmail.com",
        "password": "2dcf18a983a2",
        "birthdate": "1991-07-02T03:00:00.000Z",
        "created_date": "2017-09-27T03:00:00.000Z",
        "cpf": "34356552556",
        "profile": "D",
        "phone": "(37) 3322-2255",
        "photo": "/img/img.jpg",
        "id_facebook": "3a1df32a1sd3f21a2",
        "newsletter_terms": 1
    },
    {
        "id": 1,
        "id_city": null,
        "name": "Name",
        "email": "email@gmail.com",
        "password": "2dcf18a983a2",
        "birthdate": "1991-07-02T03:00:00.000Z",
        "created_date": "2017-09-27T03:00:00.000Z",
        "cpf": "34356552556",
        "profile": "D",
        "phone": "(37) 3322-2255",
        "photo": "/img/img.jpg",
        "id_facebook": "3a1df32a1sd3f21a2",
        "newsletter_terms": 1
    }
]
```

### 5.3 - COUNTRY / STATE PROVINCE / CITY

#### 5.3.1 - GET /api/country

|Parameters|Required|Default Value|Description|
|---|---|---|---|

HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "name": "Brasil",
        "acronym": "BRL"
    }
]
```

#### 5.3.2 - GET /api/stateprovince/:id_country

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_country|yes|-|-|

HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_country": 1,
        "name": "Acre"
    },
    {
        "id": 2,
        "id_country": 1,
        "name": "Alagoas"
    }
]
```

#### 5.3.3 - GET /api/city/:id_state

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_state|yes|-|-|

HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 3,
        "id_state_province": 1,
        "name": "Brasiléia"
    },
    {
        "id": 4,
        "id_state_province": 1,
        "name": "Bujari"
    }
]
```

### 5.4 - FAQ

#### 5.4.1 - GET /api/faq

|Parameters|Required|Default Value|Description|
|---|---|---|---|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "title": "Title",
        "message": "Message"
    }
]
```

#### 5.4.2 - GET /api/faq/:id

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|

Expected Return (200)

```JAVASCRIPT
{
    "id": 1,
    "title": "Title",
    "message": "Message"
}
```

#### 5.4.3 - DELETE /api/faq/:id

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

#### 5.4.4 - POST /api/faq

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|title|yes|-|-|
|message|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[id]
```

#### 5.4.4 - PUT /api/faq

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|
|title|yes|-|-|
|message|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

### 5.5 - USER_NOTIFICATION

#### 5.5.1 - GET /api/usernotification/:id_user/:status?

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|status|no|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_user": 1,
        "created_date": "2017-10-11T03:00:00.000Z",
        "view_date": null,
        "message": "Message",
        "status": 0
    },
    {
        "id": 2,
        "id_user": 1,
        "created_date": "2017-10-01T03:00:00.000Z",
        "view_date": null,
        "message": "Message",
        "status": 0
    }
]
```

#### 5.5.2 - DELETE /api/usernotification/:id

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

#### 5.5.3 - POST /api/usernotification

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|message|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[id]
```

#### 5.5.4 - PUT /api/usernotification

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id|yes|-|-|
|view_date|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

### 5.6 - RL_USER_VISIT / RL_USER_FAVORITE / RL_USER_LIKE

#### 5.6.1 - POST /api/uservisit

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_visited_user|yes|-|-|
|id_visitor_user|yes|-|-|
|visit_date|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[id]
```

#### 5.6.2 - POST /api/userfavorite

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|id_favorite_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[id]
```

#### 5.6.3 - POST /api/userlike

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|id_liked_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[id]
```

#### 5.6.4 - GET /api/uservisit/:id_visited_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_visited_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_city": null,
        "name": "Name",
        "email": "email@gmail.com",
        "password": "2dcf18a983a2",
        "birthdate": "1991-07-02T03:00:00.000Z",
        "created_date": "2017-09-27T03:00:00.000Z",
        "cpf": "34356552556",
        "profile": "D",
        "phone": "(37) 3322-2255",
        "photo": "/img/img.jpg",
        "id_facebook": "3a1df32a1sd3f21a2",
        "newsletter_terms": 1
    }
]
```

#### 5.6.5 - GET /api/userfavorite/:id_favorite_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_favorite_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_city": null,
        "name": "Name",
        "email": "email@gmail.com",
        "password": "2dcf18a983a2",
        "birthdate": "1991-07-02T03:00:00.000Z",
        "created_date": "2017-09-27T03:00:00.000Z",
        "cpf": "34356552556",
        "profile": "D",
        "phone": "(37) 3322-2255",
        "photo": "/img/img.jpg",
        "id_facebook": "3a1df32a1sd3f21a2",
        "newsletter_terms": 1
    }
]
```

#### 5.6.6 - GET /api/userlike/:id_liked_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_liked_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 1,
        "id_city": null,
        "name": "Name",
        "email": "email@gmail.com",
        "password": "2dcf18a983a2",
        "birthdate": "1991-07-02T03:00:00.000Z",
        "created_date": "2017-09-27T03:00:00.000Z",
        "cpf": "34356552556",
        "profile": "D",
        "phone": "(37) 3322-2255",
        "photo": "/img/img.jpg",
        "id_facebook": "3a1df32a1sd3f21a2",
        "newsletter_terms": 1
    }
]
```

#### 5.6.7 - GET /api/userfavorite/user/:id_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 17,
        "skin_color": 1,
        "eye_color": 1,
        "stature": 1,
        "blood_type": 1,
        "hair_color": 1,
        "hair_texture": 1,
        "formation": 1,
        "location": "Abaete dos Mendes,Minas Gerais"
    }
]
```

#### 5.6.8 - GET /api/userlike/user/:id_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
[
    {
        "id": 17,
        "skin_color": 1,
        "eye_color": 1,
        "stature": 1,
        "blood_type": 1,
        "hair_color": 1,
        "hair_texture": 1,
        "formation": 1,
        "location": "Abaete dos Mendes,Minas Gerais"
    }
]
```

#### 5.6.9 - DELETE /api/userfavorite/:id_user/:id_favorite_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|id_favorite_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

#### 5.6.10 - DELETE /api/userlike/:id_user/:id_liked_user

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|id_user|yes|-|-|
|id_liked_user|yes|-|-|

Expected Return (200)

```JAVASCRIPT
1
```

### 5.7 - UPLOAD

#### 5.7.1 - POST /api/upload

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|file|yes|-|-|

HEADER
```
AUTHORIZATION: 7f8e1bf987f77a039f1791f35a2932912340cd8d2bb92e8087745123b895c638c710357067460a0937d54384ddcf1e7d82bf629a78
```

Expected Return (200)

```JAVASCRIPT
[
    "/upload/AIe2A_20171004_214538.jpg"
]
```

AJAX example
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
