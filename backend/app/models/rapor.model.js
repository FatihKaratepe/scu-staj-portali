const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Rapor = sequelize.define('Rapor', {
    stajId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tarih: DataTypes.DATE,
    aciklama: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    baslik: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    durum: {
        type: DataTypes.ENUM('Girilmedi', 'Onay Bekliyor', 'Onaylandı', 'Reddedildi'),
        allowNull: false,
        defaultValue: 'Girilmedi'
    }
});

Rapor.sync();

module.exports = Rapor;