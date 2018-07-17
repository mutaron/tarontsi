const { User } = require("./../models/user");

exports.authCheck = (req, res, next) => {
  let token = null;
  if (req.method === "GET") token = req.headers.authorization.split(" ")[1];
  else token = req.body.token;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true
      });
    req.token = token;
    req.user = user;

    next();
  });
};

exports.authCheckAdmin = (req, res, next) => {
  let id = null;
    if (req.method === "GET") id = req.headers.split(" ")[1];
    else id = req.body.id;
 
  User.findById(id, (err, user) => {

    if (err) throw err;
    if (!user)
      return res.json({
        error: true
      } );
    
    req.user = user;

    next();
  });
};

//module.exports = (authCheck, authCheckAdmin);
