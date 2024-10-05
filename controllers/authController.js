import { JWT_SECRET } from "../config/index.js";
import USER_SCHEMA from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async(req,res) =>{
    const { email,password } = req.body;
    const findUser = await USER_SCHEMA.findOne({email});
    if(findUser){
        return res.status(404).json({message:"email already exists"})
    }
    try{
        const hashPassword = await bcrypt.hash(password,10);
        let newUser = await USER_SCHEMA.create({
            ...req.body,
            password:hashPassword    
        });
        return res.status(201).json({ success:true, message:"user registered successfully",newUser })    
    } catch (error){
        return res.status(500).json({success:false, message:"register user server error"})
    }
   
}

const loginUser = async(req,res) => {
    const { email,password } = req.body;
    const findUser = await USER_SCHEMA.findOne({email});
    if(!findUser){
        return res.status(404).json({ message:"email not found" })
    }
    let isMatch = await findUser.matchPassword(password)
    if(!isMatch){
        return res.status(404).json({message:"wrong password"})
    }
    try{
        let id = findUser._id
        let token = jwt.sign({id},JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({success:true,message:"user logged in successfully",findUser,token})

    }catch(error){
        return res.status(500).json({success:false, message:"login user server error"})
    }
}

export { registerUser,loginUser }