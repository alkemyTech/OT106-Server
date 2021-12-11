require("dotenv");
const sgMail = require("@sendgrid/mail");

const { VERIFIED_MAIL, SENDGRID_APIKEY } = process.env;

function sendEmail(email, templateId) {
  //Set up Sendgrid API KEY
  sgMail.setApiKey(SENDGRID_APIKEY);

  //Email message
  const msg = {
    to: email, // Change to your recipient
    from: VERIFIED_MAIL, // Change to your verified sender
    templateId,
  };

  //Send Email
  try {
    sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
