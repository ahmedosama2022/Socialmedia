const devenv = require('dotenv');
//Morgan req res هي وسيلة تسجيل لتطبيقات
const morgan = require('morgan');
const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/userRoutes")
const routerblog = require("./routes/BlogeRoute")

devenv.config({path: 'config.env'});
const app = express();
const PORT = process.env.port || 4000;

const dbconnection = require('./datebase');

app.use(express.json())
if (process.env.NODE_ENV = "development") {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`)
}


app.use(express.json());
app.use('/api/user', router );
app.use('/api/Blog', routerblog );
dbconnection();

app.get("/" , (req, res) => {
    res.send("Hello World");

});

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
})

