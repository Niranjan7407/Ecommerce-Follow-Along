const {Router}= require("express");
const userModel = require("../Model/userModel");
const {upload} = require("../../multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../Utils/ErrorHandler");
require("dotenv").config(
    {
        path: "../Config/.env"
    }
);

const secret = process.env.secret;

const userRouter = Router();


userRouter.post("/create-user",upload.single("file"), async(req,res,next)=>{
    const {name, email, password} = req.body;
    const userEmail = await userModel.findOne({email:email});
    if (userEmail) {
        return res.status(400).json({error: "User already exists"});
      }
      const filename = req.file.filename ;
      const fileUrl = path.join(filename);
    await bcrypt.hash(password, 10, async (err, hash)=>{
        await userModel.create({
                name:name,
                email:email,
                password:hash,
                avatar: fileUrl,
            
        })
        console.log(hash);
        return res.status(200).json({message: "User created"});
    })
    


});

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email:email});
    if(!user){
        return next(new ErrorHandler("User not found", 400));
    }
    bcrypt.compare(password, user.password, (err, result)=>{
        if (err){
            return res.status(400).json({error: "comparing error"});
        }
        if(!result){
            return res.status(400).json({error: "Invalid credentials"});
        }
        else{
            
            jwt.sign({email:email}, "secretkey", (err, token)=>{
                if(err){
                    return res.status(400).json({error: "invalid jwt"});
                }
                return res.status(200).json({ token: token});
            });
            return res.status(200).json({message: "User logged in"});
        };
    });
});

module.exports = userRouter;