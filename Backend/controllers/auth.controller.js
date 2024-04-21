import User from '../models/user.model.js'
import bcyptjs from 'bcryptjs'

export const signUp=async(req,res)=>{
    
    const {username,email,password}=req.body;

    //check if all fields are  filled 
    if(username === '' || email === '' || password === '' || !username || !email || !password){
        return res.status(401).json({error:"All fields must be filled"});
    }

    //check if user a;ready exist
    let user = await User.findOne({email:email})
    if (user) {
        return res.status(409).json({ error : "User already exists." });
    }

    //hash the password before saving it to database
    const hasPassword=bcyptjs.hashSync(password,10)

    const createUser=await User.create({username,email,password:hasPassword});
    
    
    try {
        res.status(200).json(createUser);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}