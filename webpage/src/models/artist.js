'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    artist_musicbrainz: {type:DataTypes.STRING, unique: true}
  }, {});
  Artist.associate = function(models) {
    models.Artist.hasMany(models.Song,{as: 'artist_songs'});
  };
  return Artist;
};