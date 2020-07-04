const express = require('express')
const router =new  express.Router()

//home page
router.get('', (req,res)=>{
    res.render('index')
})

//login
router.get('/login' , (req,res)=>{
    res.render('signin')
})

//register
router.get('/register' , (req,res)=>{
    res.render('signup')
})

//404
router.get('/*' , (req,res)=>{
    res.status(404).send('404 Not found')
})


module.exports = router