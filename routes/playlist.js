var express = require('express');
var router = express.Router();
var playlist_controller = require('../controller/playlist');

router.post('/create_playlist', playlist_controller.create_playlist);
router.get('/playlist_user/:id([0-9]{1,})', playlist_controller.get_by_user_id);
router.get('/playlist/:id([0-9]{1,})/videos', playlist_controller.get_playlist_videos);
router.get('/playlist/:id([0-9]{1,})', playlist_controller.get_by_playlist_id);
router.delete('/playlist/:id([0-9]{1,})', playlist_controller.delete_playlist);

module.exports = router;