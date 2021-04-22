'use strict';

var video_model = () => {

};

video_model.insert_video = async (attributes, res) => {
    return await res.locals.mysql.query(`INSERT INTO video_table (video_name, video_location, video_size, user_id, module, week_number, topic, description, video_added_at)
                                        VALUES (?, ?, ?, ?, ?, ?, ?,?, CURRENT_TIMESTAMP)`, [attributes.name, attributes.path, attributes.size, attributes.user, attributes.module, attributes.week, attributes.topic, attributes.description]);
};

video_model.video_list = async (res) => {
    return await res.locals.mysql.query(`SELECT video_id, video_name, module, topic, description, week_number, (SELECT title FROM modules WHERE id=module) AS module_name FROM video_table`);
};

video_model.get_video_by_id = async (id, res) => {
    return await res.locals.mysql.query(`SELECT * FROM video_table WHERE video_id = ?`,[id]);
};

module.exports = video_model;