const express = require('express')
const path = require('path')


const app = express()
const Port = process.env.PORT || 3000

//static path
const staticPath = path.join(__dirname,'../public')
app.use(express.static(staticPath))

console.log(staticPath)

app.get('' , (req,res)=>{
    res.send('index')
})
//home page
app.listen(Port , ()=>{
    console.log('app is listen in port ' + Port)
})