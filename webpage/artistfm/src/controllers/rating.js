const Rating = require('../models').Rating;

module.exports = {
    getAll(req,res){
        return Rating.findAll({
            order: [['createdAt', 'DESC'],],
        }).then((ratings) => res.status(200).send(ratings))
        .catch((error) => res.status(400).send(error));
    },
    getByUser(req,res){
        return Rating.findAll({
            where:{UserId:req.params.id}
        }).then((ratings) => res.status(200).send(ratings))
        .catch((error) => res.status(400).send(error));
    },
    getByArtist(req, res){
        return Rating.findAll({
            where:{ArtistId:req.params.id}
        }).then((ratings) => res.status(200).send(ratings))
        .catch((error) => res.status(400).send(error));
    },
    get(req,res){
        return Rating.findAll({
            where:{ArtistId:req.params.artist_id, UserId: req.params.user_id}
        }).then((ratings) => {
            if(ratings.length == 0){
                return res.status(404).send({
                    message: 'Rating not found',
                });
            }
            res.status(200).send(ratings);
        }).catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return Rating.findAll({
            where:{ArtistId:req.body.artist_id, UserId: req.body.user_id}
        }).then((ratings) => {
            if(ratings.length > 0){
                return res.status(404).send({
                    message: 'That rating already exists',
                });
            }
            return Rating.create({            
                rating_value: req.body.rating_value,
                UserId: req.body.user_id,
                ArtistId: req.body.artist_id,
            }).then((rating) => res.status(201).send(rating))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return Rating.findById(req.params.id)
        .then((rating) =>{
            if (!rating) {
                return res.status(404).send({
                    message: 'Rating not found',
                });
            }
            return rating.update({
                rating_value: req.body.rating_value || rating.rating_value,
                UserId: req.body.user_id || rating.UserId,
                ArtistId: req.body.artist_id || rating.ArtistId,
            })
            .then((rating) => res.status(200).send(rating))
            .catch((error) => res.status(400).send(error));
        })
    },
    delete(req,res){
        return Rating.findById(req.params.id)
        .then((rating) =>{
            if (!rating) {
                return res.status(400).send({
                    message: 'Rating not found.',
                });
            }
            return rating.destroy()            
            .then((rating) => res.status(200).send(rating))
            .catch((error) => res.status(400).send(error));
        })
    },
};