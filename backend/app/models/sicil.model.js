const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Sicil = sequelize.define('Sicil', {
    stajId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subeBirim: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    devamDurumu: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    devamDurumuDusunce: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    calismaGayreti: {
        type: DataTypes.STRING,
        allowNull: true
    },
    calismaGayretiDusunce: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    isiTamYapma: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    isiTamYapmaDusunce: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    isYeriTutumu: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    isYeriTutumuDusunce: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    }
});

Sicil.sync();

module.exports = Sicil;