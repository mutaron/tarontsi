const express = require("express");

const { User } = require( "../models" );
const { authCheck } = require("../middleware/auth-check");

const router = express.Router();


//////******  POST  *******/

router.post( "/register", ( req, res ) => {
  console.log(req);
  
  User.findOne({ 'email': req.body.user.email }, (err, u) => {
    if (u) return res.json({ status: 404, isAuth: false, error: "Email exists." });
    const user = new User(req.body.user);
    user.save((err, doc) => {
      if (err) return res.json({ success: false, error: err.code });
      res.status(201).json({ isAuth: true, error: null, user: doc });
    });
  });
});

router.post( "/login", ( req, res ) => {  
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: "Email doesnt exist"
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Wrong password"
        } );
      if ( !user.active )
        return res.json( {
          isAuth: false,
          message: "Account is not active. Please activate your account first"
        } );
      user.generateToken( ( err, user ) => {
        if ( err ) return res.status( 400 ).send( err );        
        res.cookie("x-auth", user.token).json({
          isAuth: true,
          user
        });
      });
    });
  });
} );

router.post( "/logout", authCheck, ( req, res ) => {
  req.user.deleteToken(req.body.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status( 200 ).json( {success: true});
  });
});

router.post("/confirmregisteration", (req, res) => {
  let id = req.query.id;

  User.findOneAndUpdate(
    { confirmtoken: id },
    { $set: { active: true } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(error);
      res.status(200).json({ isAuth: true, user: doc });
    }
  );
});

//////****** END OF POST  *******/

//////******  GET  *******/


router.get("/auth", authCheck, (req, res) => {
  res.json({
    isAuth: true,
    user: req.user
  });
});

//////****** END OF GET  *******/


module.exports = router;