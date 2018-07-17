const express = require("express");

const { Ledger } = require("../models");
const { authCheckAdmin } = require("../middleware/auth-check");

const router = express.Router();

//////******  POST  *******/

router.post( "/add_ledger", authCheckAdmin, ( req, res ) => {
  let user = req.user;
  if ( user.role !== 3 ) return res.status( 403 ).send( { message: 'Access denied' } );
  const ledger = new Ledger( req.body.ledger );
  console.log(ledger);
  
  ledger.save((err, doc) => {
    if (err) return res.json({ success: false, error: err });
    res.status(201).json({ error: null, ledger: doc });
  });
});


//////****** END OF POST  *******/


//////******  GET  *******/

router.get("/ledgers", authCheckAdmin, (req, res) => {
  let user = req.user;
  if (user.role !== 3) return res.status(403).send({ error: "Access denied" });
  let month = req.query.month;
  let year = req.query.year;

  if (!month || !year) return res.send({ error: "Values have to specified" });
  const sdate = new Date(`${year}-${month}-1`);
  const edate = new Date(`${year}-${month}-31`);
  //Ledger.find()
  console.log(edate);
  Ledger.find( { "entry_date": { $gte: sdate, $lte: edate } }).exec (function ( err, doc ) {
    if ( err ) return res.status( 400 ).send( err );
    res.send(doc);
  });
});

//////****** END OF GET  *******/

module.exports = router;