'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    admin_names: DataTypes.STRING,
    admin_lastnames: DataTypes.STRING,
    admin_email: {type:DataTypes.STRING, unique: true},
    admin_password: DataTypes.STRING
  }, {});
  Admin.associate = function(models) {
    models.Admin.hasMany(models.Contest);
  };
  return Admin;
};