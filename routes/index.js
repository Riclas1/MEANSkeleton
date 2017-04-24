var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render(path.join(__dirname + '/public/indexView/view/index'), { title: "Node App"});
});

module.exports = router;
