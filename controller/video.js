const video_modal = require('../model/video');
var path = require('path'); 

exports.upload_video = async function(req, res) {
    try {
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" })
        }
            // accessing the file
        const info = JSON.parse(req.body.info)
        const myFile = req.files.file;
        const user = JSON.parse(req.body.user);
        const name = user.user_id + '-' + info.video_name + '-' + Date.now() + '-' + myFile.name
        const attributes = { 
            name : info.video_name,
            path : `./uploads/${name}`,
            size : req.files.file.size,
            user : user.user_id,
            topic : info.topic,
            week : info.week,
            module : info.module_id,
            description : info.description
        }
        myFile.mv(`./uploads/${name}`);
        let check_if_inserted = await video_modal.insert_video(attributes, res);
        if (!check_if_inserted) {
            throw Error('Something whent wrong');
        } else {
            return res.status(200).json({ status: 'Uploaded', name });
        }
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_video = async function(req, res) {
    try {
        const id = req.params.id;
        let video = await video_modal.get_video_by_id(id, res);
        let video_name = video[0].video_location.substr(10);
        res.sendFile(video_name, { root: './uploads' });
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_video_list = async function(req, res) {
    try {
        let video_list = await video_modal.video_list(res);
        res.status(200).send({success: true, video_list})
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}