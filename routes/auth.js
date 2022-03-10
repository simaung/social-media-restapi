const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
    try {
        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }

});

module.exports = router