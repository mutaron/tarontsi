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

app.post( '/api/register', ( req, res ) => {
  const user = new User( req.body );
  user.save( ( err, doc ) => {
    if ( err ) return res.json( { success: false } );
    res.status( 200 ).json( { success: true, user: doc } );
  } )
} );

//////******  UPDATE  *******/

//////******  DELETE  *******/


//////****** END USERS  *******/




const port = process.env.PORT || 3001;
app.listen( port, () => {
  console.log( 'SERVER RUNNING' )
} )