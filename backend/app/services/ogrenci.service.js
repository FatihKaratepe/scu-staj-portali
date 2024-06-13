const db = require("../models");
const { Op } = require('sequelize');
const lodash = require("lodash");
const Ogrenci = db.ogrenci;
const Firma = db.firma;
const FirmaYetkili = db.firmaYetkili;
const Staj = db.staj;
const Rapor = db.rapor;
const { createBasvuru } = require('../shared/document');


exports.addStaj = async (ogrenciNo, baslangicTarihi, bitisTarihi, stajKonusu, firmaId, firmaYetkiliId, gunSayisi, sigortaDurumu) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    const firma = await Firma.findOne({ where: { id: firmaId } });
    const firmaYetkili = await FirmaYetkili.findOne({ where: { id: firmaYetkiliId, firmaId: firmaId } });
    if (!ogrenci || !firma || !firmaYetkili) {
        return { status: 500, response: { message: 'Hatalı giriş' } }
    }
    let newStaj = await Staj.create({
        ogrenciNo: ogrenciNo,
        baslangicTarihi: baslangicTarihi,
        bitisTarihi: bitisTarihi,
        firmaId: firmaId,
        firmaYetkiliId: firmaYetkiliId,
        gunSayisi: gunSayisi,
        sigortaDurumu: sigortaDurumu,
        konu: stajKonusu
    });
    return { status: 200, response: newStaj }
}

exports.addFirma = async (ogrenciNo, firmaAdi, adres, telefon, hizmetAlani) => {
    const firma = await Firma.findOne({ where: { firmaAdi: firmaAdi } });
    if (firma) {
        return { status: 500, response: { message: 'Bu isimde bir firma zaten bulunuyor' } }
    }
    let newFirma = await Firma.create({
        firmaAdi: firmaAdi,
        telefon: telefon,
        hizmetAlani: hizmetAlani,
        adres: adres,
        createdBy: ogrenciNo
    });
    return { status: 200, response: newFirma }
}

exports.addFirmaYetkili = async (ogrenciNo, firmaId, eposta, isim, soyisim, gorev) => {
    const firma = await Firma.findOne({ where: { id: firmaId } });
    const firmaYetkili = await FirmaYetkili.findOne({ where: { eposta: eposta } });
    if (!firma) {
        return { status: 500, response: { message: 'Firma bulunamadı' } }
    }
    if (firmaYetkili) {
        return { status: 500, response: { message: 'Eposta le kayıtlı firma yöneticisi zaten bulunuyor' } }
    }
    let newFirmaYetkili = await FirmaYetkili.create({
        eposta: eposta,
        isim: isim,
        soyisim: soyisim,
        firmaId: firmaId,
        gorev: gorev,
        sifre: null,
        token: null,
        createdBy: ogrenciNo
    });
    return { status: 200, response: newFirmaYetkili }
}

exports.getStajList = async (ogrenciNo) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    const stajs = await Staj.findAll({ where: { ogrenciNo: ogrenciNo } });
    return { status: 200, response: stajs };
}

exports.getStaj = async (ogrenciNo, stajId) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    const staj = await Staj.findOne({ where: { ogrenciNo: ogrenciNo, id: stajId } });
    return { status: 200, response: staj };
}

exports.getStajRaporList = async (ogrenciNo, stajId) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    const rapors = await Rapor.findAll({ where: { stajId: stajId } });
    return { status: 200, response: rapors };
}

exports.addRapor = async (ogrenciNo, stajId, raporId, aciklama, baslik) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    const staj = await Staj.findOne({ where: { ogrenciNo: ogrenciNo, id: stajId } });
    if (!staj) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const rapor = await Rapor.update({ aciklama: aciklama, baslik: baslik, durum: 'Onay Bekliyor' }, { where: { id: raporId } });
    return { status: 200, response: rapor };
}

exports.updateRapor = async (ogrenciNo, stajId, raporId, aciklama, baslik) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    const staj = await Staj.findOne({ where: { ogrenciNo: ogrenciNo, id: stajId } });
    if (!staj) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const rapor = await Rapor.update({ aciklama: aciklama, baslik: baslik, durum: 'Onay Bekliyor' }, { where: { id: raporId } });
    return { status: 200, response: rapor };
}

exports.getOgrenci = async (ogrenciNo) => {
    const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: ogrenciNo } });
    if (!ogrenci) {
        return { status: 500, response: { message: 'Öğrenci bulunamadı' } }
    }
    let currentOgrenci = lodash.cloneDeep(ogrenci);
    delete currentOgrenci.token;
    delete currentOgrenci.password;
    delete currentOgrenci.updatedAt;
    delete currentOgrenci.createdAt;
    return { status: 200, response: currentOgrenci };
}

exports.printBasvuru = async (stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const test = await createBasvuru(stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer)
    return { status: 200, response: { data: test } };
}