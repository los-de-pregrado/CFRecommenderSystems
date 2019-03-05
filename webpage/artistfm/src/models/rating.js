'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating_value: DataTypes.DOUBLE
  }, {});
  Rating.associate = function(models) {
    models.Rating.belongsTo(models.Artist,{
      onDelete: "CASCADE",      
      foreignKey:{
        allowNull: false
      }
    });
    models.Rating.belongsTo(models.User,{
        onDelete: "CASCADE",      
        foreignKey:{
          allowNull: false
        }
      });
  };
  return Rating;
};