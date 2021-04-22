'use strict';
const db = require('../database/database')

var module_model = () => {

};

module_model.getAll = async (res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT * FROM modules`)
};

module_model.getById = async (id, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT * FROM modules WHERE id = ?`,[id])
};

module_model.getByIdArray = async (module_ids) => {
    //checking the credentials entered by the user
    return await db.query(`SELECT * FROM modules WHERE id IN (?)`,[module_ids])
};

module_model.get_module_videos = async (id ,res) => {
    return await res.locals.mysql.query(`SELECT video_id,video_name,week_number, topic, description, date_format(video_added_at, '%d-%m-%Y') AS video_added_at FROM video_table WHERE module = ?`,[id])
}

module_model.pinModule = async (user_id, module_id) => {
    return await db.query(`INSERT INTO user_modules SET user_id=?, module_id=? ON DUPLICATE KEY UPDATE module_id=module_id;`,[user_id, module_id])
}

module_model.unPinModule = async (user_id, module_id) => {
    return await db.query(`DELETE FROM user_modules WHERE user_id=? AND module_id=?;;`,[user_id, module_id])
}

module.exports = module_model;