import Cron from 'node-schedule';
import sendMail from '../jobs/sendMail.js';

let mailJob = (data = '', type = '') => {
  let job = Cron.scheduleJob(new Date().getTime() + 5000, async () => {
    if (data && type) await sendMail(data, type);
  });
};

export default {mailJob};