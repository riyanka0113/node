const { code } = require("../config/response");
const contactModel = require("../model/contact.model");
const fs = require("fs");
const path = require("path");

class ContactController {
    async create(req, res) {

        const url = req.protocol + '://' + req.get('host')
        const data = {
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            userID: req.user._id,
            image: url + "/uploads/" + req.file.filename
        };
        const contact = await contactModel.create(data);
        res.status(code.OK).json({
            success: true,
            data: contact,
        });
    }

    async get(req, res) {
        const contact = await contactModel.find({ user: req.user._id });
        res.status(code.OK).json({
            success: true,
            data: contact,
        });
    }

    async getFile(req, res) {
        const name = req.params.name;
        const pathname = path.join(__dirname + "../../uploads/" + name)
        res.sendFile(pathname)
    }
}

module.exports = new ContactController();
