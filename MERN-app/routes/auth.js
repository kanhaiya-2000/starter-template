const express = require('express');
const { SignUp, Login } = require('../controllers/auth');
const { Verify, InputVerification } = require('../middleware');

const router = express.Router()

router.post("/signup", InputVerification, (req, res) => {
    //pass name,email and password as req.body.data = {name:NAME,email:EMAIL,password:PASSWORD}
    
    SignUp(req.body.data, (err, data) => {
        if (!err) {
            res.json({ data })
        }
        else {
            res.status(400).json({ error:err })
        }
    });
})

router.post("/login", InputVerification, (req, res) => {
    //pass email and password as req.body.data = {email:EMAIL,password:PASSWORD}
    Login(req.body.data, (err, data) => {
        if (!err) {
            res.json({ data})
        }
        else {
            res.status(400).json({ error:err})
        }
    });
})

router.get("/home", Verify, (req, res) => {
    //Verification of bearer Token is implemented in middleware function Verify
    res.json({ success: true })
})

module.exports = router
