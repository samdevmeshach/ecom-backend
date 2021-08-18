const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const {errorHandler} = require("../helpers/dbErrorHandler")
require("dotenv").config()
const { use } = require("../routes/auth")
const { json } = require("body-parser")


exports.signup = ((req,res) => {
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({
            id:user._id,
            name:user.name,
            email:user.email
        })
    })
})

exports.signin = ((req,res) => {
    const { email,password } = req.body
    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : 'User with this email does not exist'
            });
        }
        
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error:"Email and password does not match"
            });
        }


        // creating token with JWT
        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

        res.cookie('t',token,{expire: new Date() + 9999});

        const {_id,name,email,role} = user

        return res.json({token,user : { _id, name, email, role}});
    });
});


exports.signout = ((req,res) => {
    res.clearCookie('t');
    res.json({message : "Signout success"})
})


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
  });

exports.isAuth = (req,res,next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user)
    {
        return res.status(403).json({
            error : "Access Denied!"
        })
    }
    next();
}

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role === 0)
    {
        return res.status(403).json({
            error : "Admin Resource! Access Denied!"
        })
    }
    next();
}