# Start-Project

- 1 - Setup
    - 1.1 - Installing
    - 1.2 - Testing
    - 1.3 - Running
- 2 - How to use the database class
- 3 - Authorization Header
- 4 - Usage
    - 4.1 - AUTH
        - 4.1.1 - POST /api/auth
        - 4.1.2 - POST /api/auth_with_hash

## 1 - Setup

### 1.1 - Installing

Run in the command line

```
npm install
```

### 1.2 - Testing

Run in the command line

```
npm test
```

### 1.3 - Running

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

## 4 - Usage

### 4.1 - AUTH

#### 4.1.1 - POST /api/auth

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

#### 4.1.2 - POST /api/auth_with_hash

|Parameters|Required|Default Value|Description|
|---|---|---|---|
|hash|yes|-|-|

Expected Return (200)

```JAVASCRIPT
{
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
}
```
