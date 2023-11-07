require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const app = express();
const webRouters = require('./routes/web');
const connection = require('./config/database');
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


//Config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
//Config template engine
configViewEngine(app);

//Declare Route
app.use('/',webRouters)


app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})