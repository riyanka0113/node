const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    image: {
        type: String
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    userID: { type: mongoose.Types.ObjectId, ref: "users" }
})

contactSchema.set("timestamps", true)

module.exports = mongoose.model("contacts", contactSchema)