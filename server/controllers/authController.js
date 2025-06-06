const router = require('express').Router();
const users =  require('./../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req,res)=> {
    try{
        // 1. Check the user is already exists or not
        console.log(req.body)
        const user = await users.findOne({email: req.body.email});
        
        // 2.If aalready exists, send err response
        if(user){
            return res.send({
                message: 'User already exists.',
                success: false
            })
        }

        // 3. Encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword

        // 4. create new user in DB
        const newUser = new users(req.body);
        await newUser.save();

        res.send({
            message : 'User Created Successfully!',
            success : true
        });

    }
    catch(err){
        res.send({
            message : err.message,
            success : false
        })
    }
})

router.post('/login', async (req,res)=>{
    try{
        // Check user is exists
        const user = await users.findOne({email : req.body.email})
        if(!user){
            return res.send({
                message : "User does not exist",
                success : false
            })
        }

        // check password is correct
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if(!isValid){
            return res.send({
                message : "Incorrect Password",
                success : false
            })
        }

        // if both are correct assign tson web token
        const token = jwt.sign({userId : user._id}, process.env.SECRET_KEY, {expiresIn: "1d"})
        res.send({
            message : "User Login Succesfully",
            success : true,
            token : token
        })


    }catch(err){
        res.send({
            message : err.message,
            success : false
        })
    }
})

module.exports = router;