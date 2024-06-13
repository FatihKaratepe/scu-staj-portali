const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Ogrenci = sequelize.define('Ogrenci', {
    ogrenciNo: {
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
    sinif: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donem: {
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
    stajYapilanGunSayisi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 45
    }
});

Ogrenci.sync();

module.exports = Ogrenci;