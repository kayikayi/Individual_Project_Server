var express = require('express');
var router = express.Router();
var user_controller = require('../controller/user');

const auth = require('../controller/auth');

router.post('/login', user_controller.login);
router.get('/userModules', auth , user_controller.userModules)
router.get('/userPlaylists', auth, user_controller.userPlaylists)
router.post('/register', user_controller.register);

module.exports = router;