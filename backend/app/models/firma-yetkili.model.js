const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const FirmaYetkili = sequelize.define('FirmaYetkili', {
    eposta: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    isim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    soyisim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firmaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sifre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gorev: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    onay: {
        type: DataTypes.ENUM('Onay Bekliyor', 'Onaylandı', 'Reddedildi'),
        allowNull: false,
        defaultValue: 'Onay Bekliyor'
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

FirmaYetkili.sync();

module.exports = FirmaYetkili;