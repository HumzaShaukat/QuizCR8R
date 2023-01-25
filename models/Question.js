const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {};

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choice1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        choice2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        choice3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        choice4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'quiz_list',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'question',
    }
);

model.exports = Question;