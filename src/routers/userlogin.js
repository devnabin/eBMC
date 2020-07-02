const express = require('express')
const router =  express.Router()

//post register
router.post('/register' ,(req,res)=>{
    console.log("done " ,req.body)
    res.send('ok')
})




module.exports = router