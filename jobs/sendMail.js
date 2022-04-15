var nodemailer = require('nodemailer');
var app = require('../conf/app.js');
var mail = require('../conf/mail.js');

let job = async (data, type) => {
  try {
    let check = await mail.sendMail({
      from: 'devTee@express.com',
      to: data.email,
      subject: data.subject,
      html: app.mail(data,type)
    });
    console.log(check);
  } catch (e) {
    console.log(e.message);
  }
};

exports = job;