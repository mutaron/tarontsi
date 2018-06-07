const express = require( 'express' );
const bodyParser = require( "body-parser" );
const cookieParser = require( "cookie-parser" );
const mongoose = require( 'mongoose' );
const config = require( './config/config' ).get( process.env.NODE_ENV );


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect( config.DATABASE );

const { User } = require( './models/user' );

app.use( bodyParser.json() );
app.use( cookieParser() );

//////******  USERS  *******/

//////******  GET  *******/

//////******  POST  *******/

app.post( '/api/user/register', ( req, res ) => {
  const user = new User( req.body );
  user.save( ( err, doc ) => {
    if ( err ) return res.json( { success: false } );
    res.status( 200 ).json( { success: true, user: doc } );
  } )
} );

app.post( '/api/user/confirmregisteration', ( req, res ) => {
  let id = req.query.id;

  User.findOneAndUpdate( { confirmtoken: id }, { $set: { active: true } }, { new: true }, ( err, doc ) => {
    if ( err ) return res.status( 400 ).send( err );
    res.status( 200 ).json( { success: true } );
  } )
} );

app.post( '/api/login', ( req, res ) => {
  User.findOne( { 'email': req.body.email }, ( err, user ) => {
    if ( !user ) return res.json( {
      isAuth: false,
      message: 'Email doesnt exist'
    } );
    user.comparePassword( req.body.password, ( err, isMatch ) => {
      if ( !isMatch ) return res.json( {
        isAuth: false,
        message: 'Wrong password'
      } );
      user.generateToken( ( err, user ) => {
        if ( err ) return res.status( 400 ).send( err );
        res.cookie( 'auth', user.token ).json( {
          isAuth: true,
          user
        } );

      } )
    } )
  } )
} )

//////******  UPDATE  *******/

//////******  DELETE  *******/


//////****** END USERS  *******/




const port = process.env.PORT || 3001;
app.listen( port, () => {
  console.log( 'SERVER RUNNING' )
} )