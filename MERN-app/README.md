## Prerequisites

Before running the source code in the local environment,
You must fulfill the following prerequisites:

* Node installed in your local environment
* npm installed
* local Mongodb environment

If you cannot setup local Mongodb environment,then you may opt for atlas mongodb

## Clone the repo

> `git clone https://github.com/kanhaiya-2000/starter-template.git`

Now navigate to the folder `starter-template/MERN-app`

## Setup .env file

Create a `.env` file and add it at the main route of the template and add the following content in the file

```javascript
MONGO_PASSWORD=<Your_mongodb_password> //This is your atlas mongodb cloud password
```
If you can set your local mongodb ,you can use `mongodb://localhost:27017/starter_app` as the `MONGOURI` (defined in `Database.js`)

## Install node_modules

> `npm install`

## Run the server

> `node index`
