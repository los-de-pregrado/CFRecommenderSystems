'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    song_name: DataTypes.STRING,
    song_musicbrainz: {type:DataTypes.STRING, unique: true}
  }, {});
  Song.associate = function(models) {
    models.Song.belongsTo(models.Artist,{
      onDelete: "CASCADE",      
      foreignKey:{
        allowNull: false
      }
    });
  };
  return Song;
};