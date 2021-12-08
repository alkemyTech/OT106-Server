require('dotenv') 
const sgMail = require('@sendgrid/mail')
function SendEmail(email,subject,templateId){
    sgMail.setApiKey(process.env.SENDGRID_APIKEY)
const msg = {
  to: email, // Change to your recipient
  from:  process.env.VERIFIED_MAIL, // Change to your verified sender
  subject: subject,
  templateId: templateId,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}
module.exports = SendEmail


