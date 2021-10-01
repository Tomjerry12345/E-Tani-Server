const {validationResult} = require('express-validator');
const Users = require('../models/users');

exports.register = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       const errorValue = errors.array()
       const msg = errorValue[0].msg
       const err = new Error(msg);
       err.status = 400;
       throw err;
    }

    const username = req.body.username

    Users.find({username: username})
    .then(result => {
        console.log(result.length)
        if (result.length != 0) {
            const error = new Error('Username sudah terdaftar');
            error.status = 404;
            throw error;
        }

        const dataUsers = new Users(req.body);

        return dataUsers.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Register Succes',
            data: result
        })
    })
    .catch(err => next(err))

  
}

exports.login = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorValue = errors.array()
        const msg = errorValue[0].msg
        const err = new Error(msg);
        err.status = 400;
        throw err;
     }

    const username = req.body.username;
    const password = req.body.password;

    Users.find({username: username})
    .then(result => {
        if (result.length == 0) {
            const error = new Error('Username tidak ditemukan');
            error.status = 404;
            error.data = null;
            throw error;
        }
        return Users.find({password: password});
    })
    .then(result => {
        if (result.length == 0) {
            const error = new Error('Password salah');
            error.status = 404;
            error.data = null;
            throw error;
        }
        Users.findOneAndUpdate({username: username}, {statusLogin: true}, (err, doc) => {
            if (err) next(err)
            console.log("user: ", doc)
        
            res.status(200).json({
                message: 'Login Succes',
                data: doc
                })
            })
    })
    .catch(err => next(err));

}

exports.logOut = (req, res, next) => {
    Users.findOneAndUpdate({statusLogin: true}, {statusLogin: false}, (err, doc) => {
    if (err) next(err)
    res.status(200).json({
        message: 'Berhasil logout'
        })
    })
}