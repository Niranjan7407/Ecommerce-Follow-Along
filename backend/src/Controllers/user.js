const {Router}= require("express");
const userModel = require("../Model/userModel");
const {upload} = require("../../multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../Utils/ErrorHandler");
const auth = require("../Middleware/Auth");
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
            
            jwt.sign({email:email}, secret, (err, token)=>{
                if(err){
                    return res.status(400).json({error: "invalid jwt"});
                }
                res.setHeader("Authorization", `Bearer ${token}`);
                return res.status(200).json({ token: token});
            });
            return res.status(200).json({message: "User logged in"});
        };
    });
});

userRouter.get("/get-user",auth, async(req,res)=>{
    const user = req.user;
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user:user});
});

userRouter.get("/get-user",auth, async(req,res)=>{
    const user = req.user;
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({cart:user.cart});
});

userRouter.post("/add-address",auth,async(req,res)=>{
    const {email,address} = req.body;
    if (!email | !address){
        return res.status(400).json({message:"Email and Address required!"})
    }
    try{
        const findUser = await userModel.findOne({email:email})
        findUser.addresses.push(address)
        await findUser.save()
        return res.status(200).json({message:"Address added successfully."})
    }catch(err){
        console.log(err)
    }
})

userRouter.get("/get-address",auth, async(req,res)=>{
    const email = req.body.email;
    const user = await userModel.findOne({email:email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({addresses:user.addresses});
});

module.exports = userRouter;