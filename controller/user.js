var model_user = require('../model/user');
var model_modules = require('../model/modules');
var model_playlists = require('../model/playlist');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async function(req, res) {
    try {
        var email = req.body.email,
            password = req.body.password;
        if (!/\S+@\S+\.\S+/.test(email)) //email format validation
            throw Error("Incorrect email");
        if (password.length == 0) //passing the user input to be validate
            throw Error("Password too short");
        check_credentials = await model_user.authentication(email, res);
        if (!check_credentials[0])
            throw Error("Invalid credentials");
        if (!bcrypt.compareSync(password, check_credentials[0].user_password)) throw Error("Invalid credentials")
        res.body = check_credentials[0];
        res.body.links = {
            modules: 'http://localhost:3030/userModules',
            playlists: 'http://localhost:3030/userPlaylists'
        }
        res.send(res.body);
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}

exports.userModules = async function(req, res){
    try{
        let modulesArr = [];
        let modules = []
        let check_modules = await model_user.getUserModules(req.user.user_id);
        if(check_modules[0].modules_id != null)
            modulesArr = check_modules[0].modules_id.split(',').map(Number)
        if(modulesArr.length)
            modules = await model_modules.getByIdArray(modulesArr)
        if(check_modules){
            res.status(200).send({ modulesArr: modulesArr, modules : modules })
        }
    } catch (Error){
        res.status(505).send({ error_message: Error.message })
    }
}

exports.userPlaylists = async function(req, res){
    try{
        let check_playlists = await model_user.getUserPlaylists(req.user.user_id);
        if(check_playlists){
            if(check_playlists[0].playlists_id === null)
                res.status(200).send({ playlists : null})
            else{
                let playlists = check_playlists[0].playlists_id.split(',').map(Number);
                playlists = await model_playlists.getByIdArray(playlists);
                res.status(200).send({ playlists : playlists })
            }
        }
    } catch (Error){
        console.log(Error)
        res.status(505).send({ error_message: Error.message })
    }
} 

exports.register = async function(req, res) {
    try {
        var check_credentials = await model_user.authentication(req.body.email, res);
        if (check_credentials[0])
            throw Error('Email is already registered');
        if (req.body.role === undefined)
            req.body.role = "user"
        if (!/\S+@\S+\.\S+/.test(req.body.email)) //email pattern ---@---.---
            throw Error('Incorrect email format');
        if (req.body.confirm_password != req.body.password) //password must have one digit,one uppercase, one lower case and be at least 5 characters long
            throw Error('Passwords not maching');
        if (!/(?=.*\d)(?=.*[a-z]).{3,20}/.test(req.body.password)) //password must have one digit,one uppercase, one lower case and be at least 5 characters long
            throw Error('Password too short');
        if (!(/(?=.*[a-z]).{2,}/.test(req.body.name))) //name must be at least 2 characters long and have only low letters on capital letters
            throw Error('Invalid name');
        else {
            function capitalizeFirstLetter(string) {
                return string[0].toUpperCase() + string.slice(1);
            }
            req.body.name = capitalizeFirstLetter(req.body.name);
        }
        //student id of lenght 7
        if (!req.body.student_id.length == 7) throw Error('Invalid student id number');
        //hash the password
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        //insert the new user to the database
        let check_if_register = await model_user.insert_new_user(req.body.name, req.body.email, req.body.student_id, hash, req.body.role, res)
        //check if inserted
        if (!check_if_register) {
            throw Error('Something whent wrong');
        }
        //redirect the user to the main page
        check_credentials = await model_user.authentication(req.body.email, res);
        res.body = check_credentials[0];
        res.body.links = {
            modules: 'http://localhost:3030/userModules',
            playlists: 'http://localhost:3030/userPlaylists'
        }
        res.status(200).send(res.body);
    } catch (Error) {
        res.status(200).send({success: false, error: {message: Error.message}});
    }
}