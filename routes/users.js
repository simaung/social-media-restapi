const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            return res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can update only your account!")
    }
});

module.exports = router