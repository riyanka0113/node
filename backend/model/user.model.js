const { mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.set('timestamp', true)

module.exports = mongoose.model("users", userSchema)