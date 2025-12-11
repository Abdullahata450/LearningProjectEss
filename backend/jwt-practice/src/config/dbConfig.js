const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jwt_db")

mongoose.connection.on("connected",() => {
    console.log("Mongodb connected")
})

mongoose.connection.on("error",(error) => {
    console.log(`Mongodb failed to connect: ${error};
    }`)
})

module.exports = mongoose;