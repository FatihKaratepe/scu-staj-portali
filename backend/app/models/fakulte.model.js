const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Fakulte = sequelize.define('Fakulte', {
    tcNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    soyisim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eposta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotograf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sifre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Fakulte.sync();

module.exports = Fakulte;