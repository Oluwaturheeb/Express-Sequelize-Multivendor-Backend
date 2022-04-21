import crypt from 'bcryptjs';
import {
  Roles,
  Users,
  seq
} from '../conf/db.js';
import {
  mailJob
} from './cron.js';
import app from '../conf/app.js';
import jwt from 'jsonwebtoken';
import {
  uuidv7
} from 'uuidv7';

export const login = async (req, res) => {
  let email = req.body.email,
  password = req.body.password;

  if (!email && !password) res.status(403).json({
    message: 'Action required!'
  });
  else {
    try {
      let loginQuery = {
        where: {
          email: app.validate(email),
          // verify: 'YES'
        },
        include: [{
          model: Roles,
          attributes: ['role']
        }]
      };
      if (req.route.path === '/login')
        var user = await Users.findOne(loginQuery);
      else {
        delete loginQuery.where.verify;
        user = await Admin.findOne(loginQuery);
      }
      
      if (!user) res.status(400).json({
        code: 0, message: 'Credentials does not match any account!'
      });
      else {
        if (user.status == 'BLOCKED') res.status(403).json({
          code: 0, message: 'This account has been blocked!'
        });
        else {
          let check = await crypt.compare(password, user.password);

          if (!check) res.status(400).json({
            code: 0, message: 'Credentials does not match any account!'
          });
          else {
            let token = await app.signToken(user.dataValues, process.env.JWTSECRET);
            res.json({
              code: 1,
              message: `Welcome, ${user.name}`, 
              user: {
                token: token, ...user.dataValues
              }
            });
          }
        }
      }
    } catch (e) {
      res.status(412).json({
        code: 0, message: e.message
      });
    }
  }
};

export const register = async (req, res) => {
  //import ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let {
    email,
    password,
    name
  } = req.body;

  if (!email && !password && !name) res.sendStatus(412).json({
    message: 'Action required!'
  });
  else {
    try {
      if (req.user != undefined) {
        var role = (req.user.role.role === 'ADMIN')?
        (req.body.type == 2)? 'MODERATOR': 'ADMIN': 'USER';
      } else {
        role = 'USER';
      }

      let hashed = await crypt.hash(password, 10);
      let user = await seq.transaction(async t => {
        let user = await Users.create({
          id: uuidv7(),
          name: app.validate(name),
          email: app.validate(email),
          password: hashed,
        }, {
          transaction: t
        });

        await Roles.create({
          id: uuidv7(),
          userId: user.id,
          role: role
        }, {
          transaction: t
        });
        return user;
      });

      if (user) res.json({
        code: 1, message: 'Confirmation email sent!'
      });
      else res.json({
        code: 0, message: 'Cannot register user!'
      });
      let token = await app.signToken(user.dataValues.email);
      mailJob({
        url: token, ...user.dataValues
      }, 'confirmEmail');
    } catch (e) {
      console.log(e)
      res.status(412).json({
        code: 0, message: 'Email already exists!' + e.message
      })
    }
  }
};

export const confirmEmail = (req, res) => {
  try {
    let token = jwt.verify(req.params.data, process.env.JWTSECRET);
    let user = Users.update({
      verify: 'YES'
    }, {
      where: {
        email: token
      }
    });

    if (user) res.json({
      code: 1, msg: 'Email address has been confirmed'
    });
    else res.status(404).json({
      code: 0, message: 'Cannot find account!'
    });
  } catch (e) {
    res.status(404).json({
      code: 0, message: 'Cannot find account!'
    });
  }
}

export const forgotPassword = async (req, res) => {
  let email = app.validate(req.body.email);

  if (!email) res.status(412).json({
    code: 0, message: 'Action required!'
  });
  else {
    try {
      let user = await Users.findOne({
        where: {
          email: email
        }
      });

      if (!user) res.status(400).json({
        code: 0, message: 'Credentials does not match any account!'
      });
      else {
        res.json({
          code: 1, message: 'Email has been sent!'
        });
        //mail
        let token = await app.signToken(user.dataValues.email);
        let job = mailJob({
          url: token, ...user.dataValues
        }, 'welcome');
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({
        code: 0, message: e.message
      });
    }
  }
};

export const changePassword = async (req, res) => {
  let email = app.validate(req.body.email),
  password = app.validate(req.body.password);

  let stat = await updatePassword(email, password);

  if (stat.code !== 1) res.status(400).json(stat);
  else res.json(stat);
};

export const updatePassword = async (email, password) => {
  if (!email && !password) return {
    message: 'Action required!',
    code: 0
  };

  try {
    let newPassword = await crypt.hash(password, 10);
    let user = await Users.update({
      password: newPassword
    }, {
      where: {
        email: email
      }
    });

    if (!user) return {
      code: 0,
      message: 'Credentials does not match any account!'
    };

    return {
      code: 1,
      message: 'Password has been updated!'
    };
  } catch (e) {
    return {
      code: 0,
      message: 'Unknown error ' + e.message
    };
  }
};

export const google = async (req, res) => {
  let authUser = req.user;
  let user = authUser._json;

  try {
    let [newUser,
      created] = await Users.findOrCreate({
        where: {
          email: user.email
        },
        include: [{
          model: Roles,
          attributes: ['role'],
        }],
        default: {
          name: user.name,
          avatar: user.picture,
          verify: (user.email_verified) ? 'YES': 'NO',
          email: user.email,
          password: await crypt.hash(user.sub, 10),
          authType: 'SOCIAL',
        }
        });

      if (!newUser) res.json({
        code: 0, message: 'Can not create account!'
      });
      else {
        if (created) {
          await Roles.create({
            id: uuidv7(),
            userId: newUser.id,
            role: 'user'
          });
          res.json({
            code: 1, message: 'Welcome '+ newUser.name, user: newUser
          });
        } else res.json({
            code: 1, message: 'Welcome '+ newUser.name, user: newUser
          });
      }
    } catch (e) {
      res.status(500).json({
        code: 0, message: 'Unknown error!' + e.message
      });
    }
  };

  export const facebook = async (req, res) => {};