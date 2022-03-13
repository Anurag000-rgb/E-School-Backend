const router = require('express').Router();
const UserDetails = require("../models/UserDetails");
const CryptoJS = require("crypto-js");
const JWT = require('jsonwebtoken');

//Register

router.post("/register", async(req,res) => {
    const newUser = new UserDetails({
        organization: req.body.organization,
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
});

router.post("/login", async(req, res) => {
    try{
        const user = await UserDetails.findOne({username: req.body.username});
        !user && res.status(401).json('Wrong Username!')

        const hashed = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const currentpassword = hashed.toString(CryptoJS.enc.Utf8);
        const inputpassword = req.body.password
         currentpassword != inputpassword && (res.status(401).json("Wrong Credentials!"));

        const accessToken = JWT.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn: "3d"})
        
        const { password, ...others} = user._doc
        res.status(200).json({...others, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;