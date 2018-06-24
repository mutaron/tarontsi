const express = require("express");

const { User } = require( "../models" );

const router = express.Router();


//////******  POST  *******/

router.post("/register", (req, res) => {
  User.findOne({ 'email': req.body.email }, (err, u) => {
    if (u) return res.json({ status: 404, message: "Email exists." });
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err) return res.json({ success: false, error: err.code });
      res.status(201).json({ success: true, user: doc });
    });
  });
});

router.post( "/login", ( req, res ) => {
  console.log(User);
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
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          user
        });
      });
    });
  });
});

router.post("/confirmregisteration", (req, res) => {
  let id = req.query.id;

  User.findOneAndUpdate(
    { confirmtoken: id },
    { $set: { active: true } },
    { new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    }
  );
});

//////****** END OF POST  *******/

module.exports = router;