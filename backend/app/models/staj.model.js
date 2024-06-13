const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Staj = sequelize.define('Staj', {
    baslangicTarihi: DataTypes.DATE,
    bitisTarihi: DataTypes.DATE,
    gunSayisi: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ogrenciNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firmaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firmaYetkiliId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sicilId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    konu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sigortaDurumu: {
        type: DataTypes.ENUM('Evet', 'Hayır'),
        allowNull: false,
        defaultValue: 'Hayır'
    },
    gunSayisi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kabulEdilenGunSayisi: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    durum: {
        type: DataTypes.ENUM('Onay Bekliyor', 'Basvuru Onaylandı', 'Firma Onayı', 'Tamamlandı', 'Basvuru Reddedildi', 'Staj Reddedildi'),
        allowNull: false,
        defaultValue: 'Onay Bekliyor'
    },
    reddedilmeSebebi: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    }
});

Staj.sync();

module.exports = Staj;