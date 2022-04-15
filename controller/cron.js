var Cron = require('node-schedule');
var sendMail = require('../jobs/sendMail.js');

let mailJob = (data = '', type = '') => {
  let job = Cron.scheduleJob(new Date().getTime() + 5000, async () => {
    if (data && type) await sendMail(data, type);
  });
};

module.exports = {mailJob};