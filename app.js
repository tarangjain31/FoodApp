const express = require('express');
const app = express();
app.use(express.json());
const userRouter2 = require('./Routers/userRouter2');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/user', userRouter2);
app.use('/plan',planRouter);
app.use('/reviews',reviewRouter);
app.listen(3000, (req, res) => {
    console.log("listening to PORT",3000);
})












