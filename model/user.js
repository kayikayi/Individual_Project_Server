'use strict';
const db = require('../database/database')

var user_model = () => {

};

//get a single user by the (unique) username
user_model.findByUseremail = async function findByUseremail(user_name) {
    return await db.query("SELECT * FROM users_table WHERE user_name = ?",[user_name]);
}

//get user modules
user_model.getUserModules = async function getUserModules(user_id) {
    return await db.query("SELECT GROUP_CONCAT(module_id) AS modules_id FROM user_modules WHERE user_id = ?",[user_id]);
}

//get user playlists
user_model.getUserPlaylists = async function getUserPlaylists(user_id) {
    return await db.query("SELECT GROUP_CONCAT(playlist_id) AS playlists_id FROM playlist WHERE playlist_owner = ?",[user_id]);
}

user_model.authentication = async (input_email, res) => {
    //checking the credentials entered by the user
    return await res.locals.mysql.query(`SELECT * FROM users_table WHERE user_email = ?`, [input_email])
};

//inserting the new user into the db
user_model.insert_new_user = async(input_name, input_email, input_student_id, input_pass, input_admin, res) => {
    return await res.locals.mysql.query(`INSERT INTO users_table (user_name , user_email , user_password , user_student_id , role) 
                                        VALUES (?,?,?,?, ?)`, [input_name, input_email, input_pass, input_student_id, input_admin]);
};

module.exports = user_model;