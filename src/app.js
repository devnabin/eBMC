//pakages || modules importing
const express = require('express')
const path = require('path')
const hbs = require('hbs')


//db connection
require('./database/mongo')

//Routs
const userloginRoute = require('./routers/userlogin')
const pageRendringRoute = require('./routers/pageRender')
const userRoute = require('./routers/user')




//Paths
const publicPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


const app = express()


//Engines for rendring
app.use(express.static(publicPath)) //for static files only


//handles bar set up , setup engines
app.set('view engine', 'hbs'); //for hbs
app.set("views", viewsPath);  //for custome hbs path 
hbs.registerPartials(partialsPath); //for partials



//parsing body data
app.use(express.json())


//using routers
app.use(pageRendringRoute)
app.use(userloginRoute)
app.use(userRoute)



//listing port
app.listen(process.env.PORT , ()=>{
    console.log('App is listen on Port ' + process.env.PORT)
})


