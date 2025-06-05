const mongoose = require("mongoose")

//connect to mongoDB 
mongoose.connect(process.env.DB_CONNECTION_STRING);

//Connection State
const db =mongoose.connection;

//checking DB connectioin
db.on('connected', ()=> {
    console.log("DB Connection Successfully")
})

db.on('err', ()=> {
    console.log("DB Connection Failed")
})



module.exports = db;





