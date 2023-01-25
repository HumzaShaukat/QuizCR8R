const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class quiz_list extends Model {};

quiz_list.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        quiz_title: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'quiz_list',
    }
);

module.exports = quiz_list;