const Secrets = require( './secrets' );

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: '123456',
    DATABASE: 'mongodb://localhost:27017/tarontsi',
    SMTPuser: Secrets.SMTPuser,
    SMTPpass: Secrets.SMTPpass,
  }
}

exports.get = function get ( env ) {
  return config[ env ] || config.default
}