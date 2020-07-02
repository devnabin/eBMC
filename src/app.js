const express = require('express')
const app = express()


app.use(express.json())

app.post('/register' ,(req,res)=>{
    console.log(req.body)
})


app.listen(process.env.PORT , ()=>{
    console.log('App is listen on Port ' + process.env.PORT)
})
