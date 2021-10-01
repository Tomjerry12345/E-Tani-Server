const Users = require('../models/users');

exports.getAllUser = (req, res, next) => {
    Users.find({statusLogin: true})
    .then(result => {
        res.status(200).json({
            message: 'All user data succes',
            data: result
        })
    })
    .catch(err => next(err))
}

