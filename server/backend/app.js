const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require( "cookie-parser" );

const userRoutes = require("./routes/user");
const ledgerRoutes = require("./routes/ledger");
const config = require( './config/config' ).get( process.env.NODE_ENV );

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(config.DATABASE)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  } );
  
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( cookieParser() );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/admin", ledgerRoutes);

module.exports = app;