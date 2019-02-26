'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contest = sequelize.define('Contest', {
    contest_name: DataTypes.STRING,
    contest_banner: DataTypes.STRING,
    contest_url: {type: DataTypes.STRING, unique: true},
    contest_begindate: DataTypes.DATE,
    contest_enddate: DataTypes.DATE,
    contest_prize: DataTypes.DECIMAL,
    contest_script: DataTypes.TEXT,
    contest_guidelines: DataTypes.TEXT,
    contest_winner: DataTypes.INTEGER
  }, {});
  Contest.associate = function(models) {
    models.Contest.belongsTo(models.Admin,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    });
    models.Contest.hasMany(models.Participation);
  };
  return Contest;
};
