var express = require('express');
var router = express.Router();

/* GET users 

/users/hola
listing. */
router.get('/hola', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
