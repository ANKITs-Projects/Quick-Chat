const router = require('express').Router();
const users =  require('./../models/user')
const bcrypt = require('bcryptjs')

router.post('/signup', async (req,res)=> {
    try{
        // 1. Check the user is already exists or not
        console.log(req.body)
        const user = await users.findOne({email: req.body.email});
        console.log("in req")
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

module.exports = router;