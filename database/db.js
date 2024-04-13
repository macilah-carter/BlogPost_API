const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/session");
        console.log(`connected to ${mongoose.connection.name}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;