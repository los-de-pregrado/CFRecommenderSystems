'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    artist_genre: DataTypes.STRING,
    artist_count: DataTypes.INTEGER,
    artist_musicbrainz: {type:DataTypes.STRING, unique: true},
    artist_description: DataTypes.TEXT
  }, {});
  Artist.associate = function(models) {
    models.Artist.hasMany(models.Song,{as: 'artist_songs'});
  };
  return Artist;
};