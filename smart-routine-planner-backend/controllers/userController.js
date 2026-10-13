const User=require("../models/user");
const bcrypt=require("bcrypt");
const jsonwebtoken=require("jsonwebtoken");
const registerUser=async(req,res)=>{
    try{
const {name,email,password}=req.body;
const hashedPassword= await bcrypt.hash(password,10) ;
const user=await User.create({name,email,password:hashedPassword});

return res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

const loginUser=async(req,res)=>{
    try{
const {email,password}=req.body;
 const user=await User.findOne({email});
 if(!user){
    return res.status(404).json({message:"User not found"});
 }
 const isPasswordValid=await bcrypt.compare(password,user.password);
 if(!isPasswordValid){
    return res.status(401).json({message:"Invalid password"});
 }
const token = jsonwebtoken.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
); return res.status(200).json({token});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
module.exports={registerUser,loginUser};