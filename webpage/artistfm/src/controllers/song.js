const Song = require('../models').Song;
const Artist = require('../models').Artist;

module.exports = {
    getAll(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Song.findAll({
                where: {ArtistId: req.params.artist_id},
                order: [['createdAt', 'DESC'],],
            }).then((songs) => res.status(200).send(songs))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));         
    },
    get(req, res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Song.findById(req.params.id)
            .then((song) =>{
                if(!song){
                    return res.status(404).send({
                        message: 'Song not found',
                    });
                }
                return res.status(200).send(song);
            })
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    post(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Song.create({
                song_name: req.body.song_name,
                song_musicbrainz: req.body.song_musicbrainz,
                ArtistId: req.params.artist_id
            }).then((song) => res.status(201).send(song))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    put(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }

            return Song.findById(req.params.id)
            .then((song)=>{
                if(!song){
                    return res.status(404).send({
                        message: 'Song not found',
                    });
                }
                return song.update({
                    song_name: req.body.song_name || song.song_name,
                    song_musicbrainze: req.body.song_musicbrainz || song.song_musicbrainz,
                    ArtistId: req.params.artist_id || song.ArtistId
                }).then((song) => res.status(201).send(song))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
    delete(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }

            return Song.findById(req.params.id)
            .then((song)=>{
                if(!song){
                    return res.status(404).send({
                        message: 'Song not found',
                    });
                }
                return song.destroy()            
                .then((song) => res.status(200).send(song))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
};