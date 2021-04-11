const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')

router.post('/signup',(req,res)=>{
    const {name, email, password, gender} = req.body
    if(!email,!password,!name,!gender){
        return res.status(422).json({error: "Please fill  all the details"})
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error: "User already existed"})
        }
        hashpassword = bcrypt.hash(password,10)
        .then(hashpassword=>{
            const user = new User({
                name,
                email,
                password:hashpassword,
                gender
            })
            user.save()
            .then(user=>{
                res.json({msg:"saved successfully"})
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"PLease Addd Your Email & Password"})
    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            res.status(422).json({error:"Wrong Email & Password"})
        }
        bcrypt.compare(password, saveduser.password)
        .then(doMatch=>{
            if(doMatch){
            const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
            const {_id,name,email,gender} = saveduser
            res.json({token,user:{_id,name,email,gender}})
            }
            else{
                return res.status(422).json({error: "Wrong Email & Password"})
            }
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
})

module.exports = router