const APIError = require("../config/error");
const { error, code, specific } = require("../config/response");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken")
const { secret } = require("../config/index");
const { hash, compare } = require("bcryptjs");

class UserController {
    async register(req, res) {
        const { email, password } = req.body;

        const oldUser = await userModel.findOne({ email: req.body.email })

        if (oldUser) {
            throw new APIError(specific.ALREADY, code.CONFLICT)
        }

        if (!email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            throw new APIError(error.BAD_REQUEST, code.BAD_REQUEST)
        }
        if (!password || password.length < 6) {
            throw new APIError(error.BAD_REQUEST, code.BAD_REQUEST)
        }

        const hashPassword = await hash(password, 12)

        const user = await userModel.create({ email: email, password: hashPassword });

        res.status(code.OK).json({ success: true, data: user })
    }

    async login(req, res) {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            throw new APIError(`${specific.User} ${error.NOT_FOUND}`, code.NOT_FOUND)
        }

        const comparePassword = await compare(req.body.password, user.password)

        if (!comparePassword) {
            throw new APIError(specific.BAD, code.BAD_REQUEST)
        }

        const data = { email: user.email, id: user._id }
        const token = jwt.sign(data, secret, { expiresIn: '20 days' });

        res.status(code.OK).json({ success: true, data: { accessToken: token, user } })
    }
}

module.exports = new UserController()