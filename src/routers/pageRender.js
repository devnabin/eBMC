const express = require('express')
const router =new  express.Router()

//home page
router.get('', (req,res)=>{
    res.render('index')
})

//login
router.get('/login' , (req,res)=>{
    res.render('login')
})

//register
router.get('/register' , (req,res)=>{
    res.render('register')
})

//404
router.get('/*' , (req,res)=>{
    res.send('404 Not found')
})


module.exports = router