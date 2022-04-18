import express from 'express';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import Google from './conf/social.js';
// set env
import dotenv from 'dotenv';
dotenv.config({path: './conf/.env'});

// import routes
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import itemRouter from './routes/items.js';
import storeRouter from './routes/store.js';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
Google(passport);
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/store', storeRouter);


app.listen(process.env.PORT || 3000);