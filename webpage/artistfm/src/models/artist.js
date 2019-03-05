'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    artist_musicbrainz: {type:DataTypes.STRING, unique: true},
    artist_image: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    models.Artist.hasMany(models.Song,{as: 'artist_songs'});
    models.Artist.hasMany(models.Rating, {as: 'artist_ratings'});
  };
  return Artist;
};