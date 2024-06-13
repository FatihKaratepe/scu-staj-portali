const Firma = require('./firma.model');
const Ogrenci = require('./ogrenci.model');
const Staj = require('./staj.model');
const Sicil = require('./sicil.model');
const Rapor = require('./rapor.model');
const FirmaYetkili = require('./firma-yetkili.model');
const Fakulte = require('./fakulte.model');

const db = {
    ogrenci: Ogrenci,
    fakulte: Fakulte,
    firmaYetkili: FirmaYetkili,
    firma: Firma,
    sicil: Sicil,
    staj: Staj,
    rapor: Rapor,
};


module.exports = db;