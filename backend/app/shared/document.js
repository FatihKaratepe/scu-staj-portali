const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { TemplateHandler } = require('easy-template-x');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const stajDate = require('../config/staj-date');

// db
const db = require("../models");
const lodash = require("lodash");
const Ogrenci = db.ogrenci;
const Firma = db.firma;
const FirmaYetkili = db.firmaYetkili;
const Staj = db.staj;
const Rapor = db.rapor;
const Sicil = db.sicil;

const createSicil = async (stajId) => {
    try {
        const staj = await Staj.findOne({ where: { id: stajId } });
        const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: staj.ogrenciNo } });
        const firma = await Firma.findOne({ where: { id: staj.firmaId } });
        const firmaYetkili = await FirmaYetkili.findOne({ where: { id: staj.firmaYetkiliId } });
        const sicil = await Sicil.findOne({ where: { stajId: stajId } });

        const templateFile = fs.readFileSync(path.join(__dirname, 'sicil.docx'));


        const data = {
            ogrenciAdi: `${ogrenci.isim} ${ogrenci.soyisim}`,
            ogrenciSinif: ogrenci.sinif,
            ogrenciNo: ogrenci.ogrenciNo,
            image: {
                _type: "image",
                source: await getImage(ogrenci.fotograf),
                format: 'image/jpeg',
                width: 180,
                height: 180
            },
            stajBaslangic: moment(staj.baslangicTarihi).format('DD/MM/YYYY'),
            stajBitis: moment(staj.bitisTarihi).format('DD/MM/YYYY'),
            gunSayisi: stajDate(staj.baslangicTarihi, staj.bitisTarihi, staj.gunSayisi === 6).length,
            subeBirim: sicil.subeBirim,
            devamDurumu: sicil.devamDurumu,
            calismaGayreti: sicil.calismaGayreti,
            isiTamYapma: sicil.isiTamYapma,
            isYeriTutumu: sicil.isYeriTutumu,
            devamDurumuDusunce: sicil.devamDurumuDusunce,
            calismaGayretiDusunce: sicil.calismaGayretiDusunce,
            isiTamYapmaDusunce: sicil.isiTamYapmaDusunce,
            isYeriTutumuDusunce: sicil.isYeriTutumuDusunce,
            firmaYetkiliIsim: `${firmaYetkili.isim} ${firmaYetkili.soyisim}`,
            firmaYetkiliUnvan: firmaYetkili.gorev,
            bugunTarih: moment().format('DD/MM/YYYY'),
            firmaAdi: firma.firmaAdi
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(templateFile, data);
        let pdfBuf = await libre.convertAsync(doc, '.pdf', undefined);
        // fs.writeFileSync(path.join(__dirname, 'sicil-output.pdf'), pdfBuf);

        const buffer = Buffer.from(pdfBuf);
        return buffer.toString('base64');
    } catch (error) {
        console.log("Belge Hatası: ", error);
        return false;
    }

}


const createBasvuru = async (stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer) => {
    try {
        const staj = await Staj.findOne({ where: { id: stajId } });
        const ogrenci = await Ogrenci.findOne({ where: { ogrenciNo: staj.ogrenciNo } });
        const firma = await Firma.findOne({ where: { id: staj.firmaId } });
        const firmaYetkili = await FirmaYetkili.findOne({ where: { id: staj.firmaYetkiliId } });

        const templateFile = fs.readFileSync(path.join(__dirname, 'basvuru.docx'));

        const data = {
            ogrenciAdi: `${ogrenci.isim} ${ogrenci.soyisim}`,
            ogrenciSinif: ogrenci.sinif,
            ogrenciNo: ogrenci.ogrenciNo,
            donem: ogrenci.donem,
            eposta: ogrenci.eposta,
            telefon: ogrenci.telefon,
            image: {
                _type: "image",
                source: await getImage(ogrenci.fotograf),
                format: 'image/jpeg',
                width: 128,
                height: 116
            },
            stajBaslangic: moment(staj.baslangicTarihi).format('DD/MM/YYYY'),
            stajBitis: moment(staj.bitisTarihi).format('DD/MM/YYYY'),
            gunSayisi: stajDate(staj.baslangicTarihi, staj.bitisTarihi, staj.gunSayisi === 6).length,
            firmaYetkiliIsim: `${firmaYetkili.isim} ${firmaYetkili.soyisim}`,
            firmaYetkiliUnvan: firmaYetkili.gorev,
            createdDate: moment(staj.createdAt).format('DD/MM/YYYY'),
            bugunTarih: moment().format('DD/MM/YYYY'),
            firmaAdi: firma.firmaAdi,
            firmaAdres: firma.adres,
            hizmetAlani: firma.hizmetAlani,
            firmaTelefon: firma.telefon,
            sigortaDurum: staj.sigortaDurumu,

            ogrenciSoyad: ogrenci.soyisim,
            ogrenciAd: ogrenci.isim,
            babaAdi: babaAdi,
            anaAdi: anaAdi,
            dogumYeri: dogumYeri,
            dogumTarihi: dogumTarihi,
            tcNo: tcNo,
            seriNo: seriNo,
            kayitliOlduguIl: kayitliOlduguIl,
            kayitliOlduguIlce: kayitliOlduguIlce,
            mahalle: mahalle,
            ciltNo: ciltNo,
            aileSiraNo: aileSiraNo,
            siraNo: siraNo,
            verildigiYer: verildigiYer,
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(templateFile, data);
        let pdfBuf = await libre.convertAsync(doc, '.pdf', undefined);

        const buffer = Buffer.from(pdfBuf);
        return buffer.toString('base64');
    } catch (error) {
        console.log("Belge Hatası: ", error);
        return false;
    }
}


const createDefter = async (stajId) => {
    try {
        let currentRapors = []
        const stajRapors = await Rapor.findAll({ where: { stajId: stajId } });

        for (const rapor of stajRapors) {
            currentRapors.push({
                tarih: moment(rapor.tarih).format('DD/MM/YYYY'),
                raporBaslik: rapor.baslik
            })
        }
        const templateFile = fs.readFileSync(path.join(__dirname, 'defter.docx'));

        const data = {
            rapors: currentRapors,
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(templateFile, data);
        let pdfBuf = await libre.convertAsync(doc, '.pdf', undefined);

        const buffer = Buffer.from(pdfBuf);
        return buffer.toString('base64');
    } catch (error) {
        console.log("Belge Hatası: ", error);
        return false;
    }
}


async function getImage(url) {
    try {
        const response = await fetch(url);
        return Buffer.from(await response.arrayBuffer());
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

module.exports = { createSicil, createBasvuru, createDefter };