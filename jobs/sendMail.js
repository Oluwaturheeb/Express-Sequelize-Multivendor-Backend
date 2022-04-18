import app from '../conf/app.js';
import mail from '../conf/mail.js';

let job = async (data, type) => {
  try {
    let check = await mail.sendMail({
      from: 'devTee@express.com',
      to: data.email,
      subject: data.subject,
      html: app.mail(data,type)
    });
  } catch (e) {
    console.log(e.message);
  }
};

export default job;