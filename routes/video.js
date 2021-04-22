var express = require('express');
var router = express.Router();
var video_controller = require('../controller/video');

router.post('/upload', video_controller.upload_video);
router.get('/video/:id([0-9]{1,})', video_controller.get_video)
router.get('/video_list', video_controller.get_video_list)

module.exports = router;