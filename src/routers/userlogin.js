const express = require('express')
const router =  express.Router()
const signupValidation = require('../modules/signup')

//post register
router.post('/register', signupValidation ,(req,res)=>{
    res.send(req.body)
})



//post login
router.post('/login' ,(req,res)=>{
    res.send(req.body)
})



module.exports = router