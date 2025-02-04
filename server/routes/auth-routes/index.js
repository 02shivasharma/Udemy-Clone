const express = require("express");
const { registerUser } = require("../../controllers/auth-controller");
const { LogIn} = require("../../controllers/auth-controller");
const authenticatedMiddleware = require("../../middleware/auth-middleware/authmiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", LogIn);
router.get("/check-auth",
    authenticatedMiddleware, (req,res)=> {
        const user = req.user;

        res.status(201).json({
            success : true,
            message : "Authendicated User",
            data : {
                 user
            }
        })
    }
)

module.exports = router;