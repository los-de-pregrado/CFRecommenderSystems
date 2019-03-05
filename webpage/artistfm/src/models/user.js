'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_names: DataTypes.STRING,
    user_lastnames: DataTypes.STRING,
    user_email: {type:DataTypes.STRING, unique: true},
    user_password: DataTypes.STRING,
    user_image: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Rating, {as: 'artist_ratings'});
  };
  return User;
};