const mongoose = require("mongoose");
const dburl = process.env.DBURL
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(dburl);
        console.log(`connected to ${mongoose.connection.name}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;