import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import postRoute from './routes/post.js'
import commentROute from './routes/comment.js'
import cookieParser from 'cookie-parser'

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
app.use(cookieParser())

app.use('/app/v1/auth',authRouter)
app.use('/app/v1/user',userRouter);
app.use('/app/v1/post',postRoute);
app.use('/app/v1/comment',commentROute);



app.listen(3000,()=>{
    console.log("Server is running")
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });