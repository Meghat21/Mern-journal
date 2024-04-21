import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to db")
})
.catch((error)=>{
    console.log("error while connecting")
})

const app=express();
app.use(express.json())

app.use('/app/v1/auth',authRouter)

app.listen(3000,()=>{
    console.log("Server is running")
})