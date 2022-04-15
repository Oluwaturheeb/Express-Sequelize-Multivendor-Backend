var mailer = require('nodemailer');

exports = mailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "10200eee5f8248",
    pass: "28ad881b9b4af0"
  }
});
