const db = require("../models");
const stajDate = require("../config/staj-date");
const randomPassword = require("../config/password");
const FirmaYetkili = db.firmaYetkili;
const Rapor = db.rapor;
const Staj = db.staj;
const Sicil = db.sicil;
const Ogrenci = db.ogrenci;
const sendMail = require('../config/mail');
const { Op } = require('sequelize');
const { createSicil, createBasvuru, createDefter } = require('../shared/document');


exports.getStajList = async (durum) => {
    if (!durum) {
        const allStajs = await Staj.findAll();
        return { status: 200, response: allStajs };
    }
    const stajs = await Staj.findAll({ where: { durum: durum } });
    return { status: 200, response: stajs };
}

exports.searchStajList = async (durum, ogrenciNo) => {
    const stajs = await Staj.findAll({ where: { durum: durum, ogrenciNo: { [Op.like]: `%${ogrenciNo}%` } } });
    return { status: 200, response: stajs };
}

exports.changeStatus = async (id, durum) => {
    if (!durum || !id) {
        return { status: 400, response: { message: 'Hatalı giriş' } };
    }
    const updatedStaj = await Staj.update({ durum: durum }, { where: { id: id } });
    return { status: 200, response: updatedStaj };
}

exports.approveStaj = async (stajId) => {
    if (!stajId) {
        return { status: 400, response: { message: 'Hatalı giriş' } };
    }
    const staj = await Staj.findOne({ where: { id: stajId } });
    if (!staj) {
        return { status: 400, response: { message: 'Staj başvurusu bulunamadı' } };
    }
    const raporDates = stajDate(staj.baslangicTarihi, staj.bitisTarihi, staj.gunSayisi === 6);
    raporDates.forEach(e => {
        Rapor.create({
            stajId: stajId,
            tarih: e,
        });
    });
    let sicil = await Sicil.create({
        stajId: stajId,
    })
    const sifre = randomPassword(8);
    const firmaYetkili = await FirmaYetkili.update({ sifre: sifre }, { where: { id: staj.firmaYetkiliId } });
    let mailTemplate = `
    <div>
        <div><strong>Kullanıcı Adı:</strong> ${firmaYetkili.eposta}</div>
        <div><strong>Şifre:</strong> ${sifre}</div>
    </div>`
    const mailStatus = await sendMail(firmaYetkili.eposta, mailTemplate);
    const updatedStaj = await Staj.update({ durum: 'Başvuru Onaylandı', sicilId: sicil.id }, { where: { id: stajId } });
    return { status: 200, response: { message: "Staj başvurusu onaylandı" } };
}

exports.getStaj = async (stajId) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const staj = await Staj.findOne({ where: { id: stajId } });
    return { status: 200, response: staj };
}

exports.getStajRapor = async (stajId) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const rapors = await Rapor.findAll({ where: { stajId: stajId } });
    return { status: 200, response: rapors };
}

exports.printSicil = async (stajId) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const test = await createSicil(stajId)
    return { status: 200, response: { data: test } };
}

exports.printBasvuru = async (stajId) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const test = await createBasvuru(stajId)
    return { status: 200, response: { data: test } };
}

exports.printDefter = async (stajId) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const test = await createDefter(stajId)
    return { status: 200, response: { data: test } };
}

exports.changeStajGunSayisi = async (stajId, gunSayisi) => {
    if (!stajId) {
        return { status: 500, response: { message: 'Staj bulunamadı' } }
    }
    const staj = await Staj.update({ kabulEdilenGunSayisi: gunSayisi }, { where: { id: stajId } });
    const findOgrenciStaj = await Staj.findOne({ where: { id: stajId } });
    const findOgrenci = await Ogrenci.findOne({ where: { ogrenciNo: findOgrenciStaj.ogrenciNo } });
    const updateOgrenciGun = await Ogrenci.update({ stajYapilanGunSayisi: Number(findOgrenci.stajYapilanGunSayisi) - Number(gunSayisi) }, { where: { ogrenciNo: findOgrenciStaj.ogrenciNo } });
    return { status: 200, response: staj };
}
