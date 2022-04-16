import jwt from 'jsonwebtoken';
import validator from 'validator';

const app = {
  host: 'localhost:8000',
  appName: 'NothingMuch',
  appLogo: 'images/logo.png',
  validate: str => validator.escape(validator.trim(str)),
  signToken: async data => {
    let sign = await jwt.sign(data, process.env.JWTSECRET);
    return sign;
  },
  verifyMiddleware: async (req, res, next) => {
    
    try {
      let token = req.headers.authorization.split(' ')[1];
      if (!token) res.sendStatus(403);
      let check = await jwt.verify(token, process.env.JWTSECRET);
      
      if (!check) res.sendStatus(403);
      else req.token = check; next();
    } catch (e) {
      res.sendStatus(403);
    }
  },
  mail: (data, type) => {
    data.subject = 'Welcome to' +  app.appName + ', ' + data.name;
    return template(data, type);
  },
  // control how discount can be on an item
  discount: 50,
  // control charges on item purchase in %
  charges: 7,
  // control charges on topitem purchase in %
  topItemCharges: 12,
};

let template = (data, type = 'welcome') => {
  switch (type) {
    case 'welcome':
      const tmp = `
<html>
<head>
  <title>Express</title>
  <link rel="stylesheet" href="/stylesheets/style.css">
</head>

<body>
  <img src="${app.host}/${app.appLogo}">
  <p>Welcome ${data.name}, ${app.appName}</p>
</body>

</html>
`;
    break;
  }
  return tmp;
};


export default app;