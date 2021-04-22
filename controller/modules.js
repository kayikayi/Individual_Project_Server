var model_modules = require('../model/modules');

exports.get_all = async function(req, res) {
    try {
        var modules = await model_modules.getAll(res);
        res.status(200).send(JSON.parse(JSON.stringify(modules)))
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_by_id = async function(req, res) {
    try {
        const id = req.params.id;
        var modules = await model_modules.getById(id, res);
        res.status(200).send(JSON.parse(JSON.stringify(modules[0])))
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.get_module_videos = async function(req, res) {
    try {
        const id = req.params.id;
        var video_data = await model_modules.get_module_videos(id, res);
        res.status(200).send(JSON.parse(JSON.stringify(video_data)))
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.pinModule = async function(req, res) {
    try {
        const result = await model_modules.pinModule(req.user.user_id, parseInt(req.params.id));
        result.affectedRows ? res.status(200).send({ message : "pinned" }) : res.status(200).send({ message : "error" })
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.unPinModule = async function(req, res) {
    try {
        const result = await model_modules.unPinModule(req.user.user_id, parseInt(req.params.id));
        result.affectedRows ? res.status(200).send({ message : "unpinned" }) : res.status(200).send({ message : "error" })
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}