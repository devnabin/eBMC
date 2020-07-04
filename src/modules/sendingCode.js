/* const randomStrings = require('randomstring')




const randomstring = function(num , callback){
   const code =  randomStrings.generate(num);
   if(code){
       callback(code)
   }
}


module.exports = randomstring; */

const randomStrings = require("randomstring");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendCode = function (toemail , callback) {
  const code = randomStrings.generate(8);
  const msg = {
    to: toemail,
    from: "nabin123456j@gmail.com",
    subject: "Confirmation Code",
    // text: `Your Verfication code is ${code}`,
    html: `<h1 style="text-align:center">Registration Verification for eBMC</h1> <br>
    <P style="text-align:center">Thank you for eBMC Registration <br>
      Your Verification Code is <br>
      <span style="padding:3px;font-size:2rem;font-weight:bold">${code}</span></P>`,
  };
  sgMail.send(msg);
  callback(code)
};

module.exports = sendCode;
