'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_names: DataTypes.STRING,
    user_lastnames: DataTypes.STRING,
    user_email: {type:DataTypes.STRING, unique: true},
    user_password: DataTypes.STRING
  }, {});
  return User;
};