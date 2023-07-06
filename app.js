const express = require('express');
const mongoose = require('mongoose');
const { createHmac, randomBytes } = require("crypto");
const app = express();
const PORT = 8000;
require('./connection');
const User = require('./model/user');
app.use(express.json());


app.post('/',async (req,res)=>{
    const {password,cpassword}=req.body;
    if(password==cpassword){
    const result = await User.create (req.body);
    res.status(201).json({"msg":"data inserted!"}); 

    }else{
    res.status(201).json({"msg":"Password doesn't Matched"});
    }
});

app.get('/',async(req,res)=>{
    const  result = await User.find({});
    res.status(200).json({"msg":"data visiable",result});
});

app.post('/login',async(req,res)=>{ 
    const  result = await User.findOne({userName:req.body.userName});
    const hashedPassword = createHmac("sha256", result.salt).update(req.body.password).digest("hex");
    console.log(result.password,hashedPassword);
    if(result.password==hashedPassword){
    res.status(200).json({"msg":"User Login Successfully!",result});
    }
    res.status(200).json({"msg":"username & ppassword wrong"});
});

app.listen(8000, ()=>{
    console.log(`server is running on ${PORT} port`);
});
