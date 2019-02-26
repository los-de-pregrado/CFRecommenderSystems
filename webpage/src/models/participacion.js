'use strict';
module.exports = (sequelize, DataTypes) => {
    const Participation = sequelize.define('Participation', {
        participation_names: DataTypes.STRING,
        participation_lastnames: DataTypes.STRING,
        participation_email: DataTypes.STRING,
        participation_comments: DataTypes.TEXT,
        participation_date: DataTypes.DATE,
        participation_originalroute: DataTypes.STRING,
        participation_route: {type:DataTypes.STRING,allowNull: true}, 
        participation_status: DataTypes.STRING,
        participation_queuetime:{type: DataTypes.DECIMAL}
    }, {});
    Participation.associate = function (models) {
        models.Participation.belongsTo(models.Contest, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Participation;
};