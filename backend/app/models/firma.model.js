const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Firma = sequelize.define('Firma', {
    firmaAdi: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    telefon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adres: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hizmetAlani: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Firma.sync();

module.exports = Firma;