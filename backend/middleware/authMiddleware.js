const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // console.log(req.headers);
        // console.log(`Protect: ${req.headers.authorization}`);
        try {
            token = req.headers.authorization.split(" ")[1];

            // decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // console.log(decoded);

            req.user = await User.findById(decoded.id).select("-password");

            // console.log(`req.user: ${req.user}`);

            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
    }

    // console.log('before not authorized');
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})

module.exports = { protect };
