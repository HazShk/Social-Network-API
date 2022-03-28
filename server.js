//dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//internal imports
const apiRoutes = require('./routes');

//initialise the app
const app = express();

//use json bodyparser
app.use(express.json());

app.use(apiRoutes);

//define the port
const PORT = process.env.PORT || 3001;

//connect database and start the app
mongoose.connect(process.env.MONGODB_CONNECTION_URL || process.env.LOCAL_DATABASE_CONNECTION_URL).then(() => {
   console.log('App is successfully connected to the database');
   app.listen(PORT, () => console.log(`App is alive on PORT:${PORT}`));
});
