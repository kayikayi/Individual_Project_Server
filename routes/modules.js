var express = require('express');
var router = express.Router();
var modules_controller = require('../controller/modules');

const auth = require('../controller/auth');

router.get('/modules', modules_controller.get_all);
router.get('/modules/:id([0-9]{1,})', modules_controller.get_by_id)
router.post('/modules/:id([0-9]{1,})/pin', auth, modules_controller.pinModule)
router.delete('/modules/:id([0-9]{1,})/pin', auth, modules_controller.unPinModule)
router.get('/module_videos/:id([0-9]{1,})', modules_controller.get_module_videos)

module.exports = router;