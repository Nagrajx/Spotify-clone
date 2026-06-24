const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "You are Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "user"){
            return res.status(403).json({
                message:"YOu don't have access"
            })
        }

        req.user = decoded

        next()
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

async function authArtist(req, res, next) {
    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({
            message: "Forbiden Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: "You don't have access  "
            })
        }

        req.user = decoded;

        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            Message: "Unauthorized"
        })
    }


}

module.exports = { authArtist ,authUser };