var playlist_model = require('../model/playlist');

exports.create_playlist = async function(req, res) {
    try{
        const user = JSON.parse(req.body.user);
        const playlist = JSON.parse(req.body.playlist);
        const attributes = {
            playlist_name : playlist.playlist_name,
            playlist_owner : user.user_id,
            playlist_videos : playlist.selected_videos.toString()
        }
        let insert_playlist = await playlist_model.insert_playlist(attributes, res)
        if(!insert_playlist)
            throw Error('Something whent wrong');
        res.status(200).send({success: true, message: "Playlist Created!", id: insert_playlist.insertId});
    }catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_by_user_id = async function(req, res) {
    try{
        const id = req.params.id;
        let playlists = await playlist_model.get_by_user_id(id, res)
        if(!playlists)
            throw Error('Something whent wrong');
        res.status(200).send(JSON.parse(JSON.stringify(playlists)));
    }catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_by_playlist_id = async function(req, res) {
    try{
        const id = req.params.id;
        let playlist = await playlist_model.get_by_playlist_id(id, res)
        if(!playlist)
            throw Error('Something whent wrong');
        res.status(200).send(JSON.parse(JSON.stringify(playlist[0])));
    }catch (Error) {
        res.status(404).send({success: false, error: {message: Error.message}});
    }
}

exports.delete_playlist = async function(req, res) {
    try{
        const id = req.params.id;
        let playlist = await playlist_model.delete_by_id(id, res)
        if(!playlist)
            throw Error('Something whent wrong');
        res.status(200).send({success : true});
    }catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_playlist_videos = async function(req, res) {
    try{
        const id = req.params.id;
        let video_ids = await playlist_model.get_playlist_videos_ids(id, res);
        let videos = await playlist_model.get_playlist_videos(video_ids[0].playlist_videos, res);
        res.status(200).send(JSON.parse(JSON.stringify(videos)));
    }catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}