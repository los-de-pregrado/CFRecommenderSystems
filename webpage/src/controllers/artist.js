const Artist = require('../models').Artist;

module.exports = {
    getAll(req,res){
        return Artist.findAll({
            order: [['createdAt', 'DESC'],],
        }).then((artists) => res.status(200).send(artists))
        .catch((error) => res.status(400).send(error));
    },
    get(req, res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return res.status(200).send(artist);
        })
        .catch((error) => res.status(400).send(error));
    },
    post(req,res){
        return Artist.create({
            artist_name: req.body.artist_name,
            artist_musicbrainz: req.body.artist_musicbrainz,
        }).then((artist) => res.status(201).send(artist))
        .catch((error) => res.status(400).send(error));
    },
    put(req,res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if (!artist) {
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return artist.update({
                artist_name: req.body.artist_name || artist.artist_name,
                artist_musicbrainz: req.body.artist_musicbrainz || artist.artist_musicbrainz,
            })
            .then((artist) => res.status(200).send(artist))
            .catch((error) => res.status(400).send(error));
        })
    },
    delete(req,res){
        return Artist.findById(req.params.id)
        .then((artist) =>{
            if (!artist) {
                return res.status(400).send({
                    message: 'Artist not found.',
                });
            }
            return artist.destroy()            
            .then((artist) => res.status(200).send(artist))
            .catch((error) => res.status(400).send(error));
        })
    },
};