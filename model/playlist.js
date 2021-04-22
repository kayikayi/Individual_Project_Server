'use strict';
const db = require('../database/database')

var playlist_model = () => {

};

playlist_model.insert_playlist = async (attributes, res) => {
    return await res.locals.mysql.query(`INSERT INTO playlist (playlist_name, playlist_owner, playlist_videos) VALUES (?, ?, ?)`,[attributes.playlist_name,attributes.playlist_owner, attributes.playlist_videos])
};

playlist_model.get_by_user_id = async (id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT * FROM playlist WHERE playlist_owner = ?`,[id])
};

playlist_model.get_by_playlist_id = async (id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT * FROM playlist WHERE playlist_id = ?`,[id])
};

playlist_model.getByIdArray = async (playlists_ids) => {
    //checking the credentials entered by the user
    return await db.query(`SELECT * FROM playlist WHERE playlist_id IN (?)`,[playlists_ids])
};

playlist_model.delete_by_id = async (id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`DELETE FROM playlist WHERE playlist_id= ?;`,[id])
};

playlist_model.get_playlist_videos = async (video_id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT video_id,video_name,week_number, topic, description, date_format(video_added_at, '%d-%m-%Y') AS video_added_at FROM video_table WHERE video_id in (${video_id})`)
};

playlist_model.get_playlist_videos_ids = async (id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT playlist_videos FROM playlist WHERE playlist_id = ?`,[id])
};

module.exports = playlist_model;