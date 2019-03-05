const User = require('../models').User;
const Rating = require('../models').Rating;

module.exports = {
    getAll(req,res){
        return User.findAll({
            include: [Rating],
            order: [['createdAt', 'DESC'],],
        }).then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return User.findById(req.params.id)
        .then((user) =>{
            if(!user){
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return res.status(200).send(user);
        })
        .catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return User.create({
            user_names: req.body.user_names,
            user_lastnames: req.body.user_lastnames,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_image: req.body.user_image,
        }).then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return User.findById(req.params.id)
        .then((user) =>{
            if (!user) {
                return res.status(404).send({
                    message: 'User not found',
                });
            }
            return user.update({
                user_names: req.body.user_names || user.user_names,
                user_lastnames: req.body.user_lastnames || user.user_lastnames,
                user_email: req.body.user_email || user.user_email,
                user_password: req.body.user_password || user.user_password,
                user_image: req.body.user_image || user.user_image,
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        })
    },
    delete(req,res){
        return User.findById(req.params.id)
        .then((user) =>{
            if (!user) {
                return res.status(400).send({
                    message: 'User not found.',
                });
            }
            return user.destroy()            
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
        })
    },
};