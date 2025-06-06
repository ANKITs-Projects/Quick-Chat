const router = require('express').Router();
const users =  require('./../models/user')
const authMiddleware = require('./../middlewares/authMiddleware')



router.get('/get-logged-user', authMiddleware , async (req,res) => {
   
    try{
        const user = users.findOne({_id: req.body.userId})

        res.send({
            message: 'user fetched successfully',
            success : true,
            data : user
        })
    }catch(err){
        res.send({
            message : err.message,
            success : false
        })
    }
})


module.exports =router