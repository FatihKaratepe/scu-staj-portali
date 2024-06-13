const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('veritabani_ismi', 'veritabani_kullanici_adi', 'veritabani_kullanici_sifresi', {
  host: 'veritabani_host_baglantisi',
  dialect: 'mysql',
});

module.exports = sequelize;