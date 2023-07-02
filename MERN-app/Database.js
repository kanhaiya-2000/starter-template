
//This file is for establishing a connection to mongodb database

const mongoose = require("mongoose");
const MONGOURI = "mongodb://newsagreegator_airtelcustomsafety:<password>@ac-qdtgh58-shard-00-00.ixjozmy.mongodb.net:27017,ac-qdtgh58-shard-00-01.ixjozmy.mongodb.net:27017,ac-qdtgh58-shard-00-02.ixjozmy.mongodb.net:27017/?ssl=true&replicaSet=atlas-bxujk7-shard-0&authSource=admin&retryWrites=true&w=majority".replace("<password>",process.env.MONGO_PASSWORD)

const DB = async () => {
  try {
    const connection = await mongoose.connect(MONGOURI, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });

    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = DB;