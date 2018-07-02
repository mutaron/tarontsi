const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const SALT_I = 10;
const config = require( './../config/config' ).get( process.env.NODE_ENV );
const nodemailer = require( 'nodemailer' );

const userSchema = mongoose.Schema( {
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstname: {
    type: String,
    maxLength: 100
  },
  lastname: {
    type: String,
    maxLength: 100
  },
  role: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: false
  },
  approved: {
    type: Boolean,
    default: false
  },
  confirmtoken: {
    type: String
  },
  token: {
    type: String
  }
} )

userSchema.pre( 'save', function ( next ) {
  var user = this;
  if ( user.isModified( 'password' ) ) {
    bcrypt.genSalt( SALT_I, ( err, salt ) => {
      if ( err ) return next( err );

      bcrypt.hash( user.password, salt, function ( err, hash ) {
        if ( err ) return next( err );
        user.password = hash;
        next();
      } )

    } )
  }
  else {
    next();
  }
} );

userSchema.pre( 'save', function ( next ) {
  var user = this;
  let transporter = nodemailer.createTransport( {
    service: 'gmail',
    secure: false,    
    auth: {
      user: config.SMTPuser,
      pass: config.SMTPpass
    }
  } );
  if ( user.isModified( 'email' ) ) {
    user.confirmtoken = jwt.sign( user._id.toHexString(), config.SECRET );

    var mailOptions = {
      from: 'info@tarontsi.com', // sender address
      to: user.email, // This can also contain an array of emails
      subject: 'Thanks for registering with tarontsi.com',
      html: "<b>Please click this url</b> http://localhost:3000/user/confirmregisteration/" + user.confirmtoken + "<br/><b>to finish your registration</b>"

    };
    
    transporter.sendMail( mailOptions, ( error, info ) => {
      if ( error ) {
        return console.log( error );
      }
      next();
    } );
  }
  else {
    next();
  }
} );

userSchema.methods.comparePassword = function ( candidatePassword, cb ) {
  bcrypt.compare( candidatePassword, this.password, ( err, isMatch ) => {
    if ( err ) return cb( err );
    cb( null, isMatch );
  } )
};

userSchema.methods.generateToken = function ( cb ) {
  var user = this;
  var token = jwt.sign( user._id.toHexString(), config.SECRET );

  user.token = token;
  user.save( function ( err, user ) {
    if ( err ) return cb( err );
    cb( null, user );
  } )
};

userSchema.methods.deleteToken = function ( token, cb ) {
  var user = this;
  user.update( { $unset: { token: 1 } }, ( err, user ) => {
    if ( err ) return cb( err );
    cb( null, user );
  } )
}

userSchema.statics.findByToken = function ( token, cb ) {
  var user = this;
  jwt.verify( token, config.SECRET, function ( err, decode ) {
    user.findOne( { "_id": decode, "token": token }, function ( err, user ) {
      if ( err ) return cb( err );
      cb( null, user );
    } )
  } )
}


const User = mongoose.model( 'User', userSchema );

module.exports = { User }