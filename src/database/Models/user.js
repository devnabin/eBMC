  const mongoose = require('mongoose')
  const userSchema = new mongoose.Schema({
      name : {
          type : String,
          required : true,
      },
      pic : {
          type : Buffer,
      },
      email : {
          type : String,
          required : true,
          unique : true,
          lowercase:true,
          trim: true,
      },
      password: {
          type : String,
          minlength : 8,
          required : true,
      },
      bio:{
          type: String,
          minlength: 20,
      },
      age :{
          type : Number ,
      },
      popularity : [
          {
          nofollower : {
              type : Number,
          },
          nofollowing : {
              type : Number,
          },
          followers:{
              type : mongoose.Schema.Types.ObjectId,
              ref : 'user'
          },
          following :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
          },
      }
      ],
      tokens :[
          {
            token : {
                type : String , 
                required : true,
            }
          }
      ]
  },{
      timestamps : true,
  })




const User = mongoose.model('user' , userSchema)

module.exports = User;