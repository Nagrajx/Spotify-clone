const userModel = require("../model/user_model");
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');

require('dotenv').config();

async function registerUser(req, res) {

    const { username, email, password, role = 'user' } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({
            message: "All Fileds Are Required"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User Created",
        user
    })

}



async function loginUser(req, res) {
    const { username, password, email } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in Successfully",
        user
    })

}


module.exports = { registerUser, loginUser }


