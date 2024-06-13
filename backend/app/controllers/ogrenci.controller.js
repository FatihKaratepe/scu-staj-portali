const ogrenciService = require("../services/ogrenci.service");

exports.addFirma = async (req, res) => {
    const ogrenciNo = req.params.id;
    const { firmaAdi, adres, telefon, hizmetAlani } = req.body;
    const { status, response } = await ogrenciService.addFirma(ogrenciNo, firmaAdi, adres, telefon, hizmetAlani);
    res.status(status).send(response);
}

exports.addFirmaYetkili = async (req, res) => {
    const ogrenciNo = req.params.id;
    const { firmaId, eposta, isim, soyisim, gorev } = req.body;
    const { status, response } = await ogrenciService.addFirmaYetkili(ogrenciNo, firmaId, eposta, isim, soyisim, gorev);
    res.status(status).send(response);
}

exports.addStaj = async (req, res) => {
    const ogrenciNo = req.params.id;
    const { baslangicTarihi, bitisTarihi, stajKonusu, firmaId, firmaYetkiliId, gunSayisi, sigortaDurumu } = req.body;
    const { status, response } = await ogrenciService.addStaj(ogrenciNo, baslangicTarihi, bitisTarihi, stajKonusu, firmaId, firmaYetkiliId, gunSayisi, sigortaDurumu);
    res.status(status).send(response);
}

exports.getStajList = async (req, res) => {
    const ogrenciNo = req.params.id;
    const { status, response } = await ogrenciService.getStajList(ogrenciNo);
    res.status(status).send(response);
}

exports.getStaj = async (req, res) => {
    const ogrenciNo = req.params.id;
    const stajId = req.params.stajId;
    const { status, response } = await ogrenciService.getStaj(ogrenciNo, stajId);
    res.status(status).send(response);
}

exports.getStajRaporList = async (req, res) => {
    const ogrenciNo = req.params.id;
    const stajId = req.params.stajId;
    const { status, response } = await ogrenciService.getStajRaporList(ogrenciNo, stajId);
    res.status(status).send(response);
}

exports.addRapor = async (req, res) => {
    const ogrenciNo = req.params.id;
    const stajId = req.params.stajId;
    const { raporId, aciklama, baslik } = req.body
    const { status, response } = await ogrenciService.addRapor(ogrenciNo, stajId, raporId, aciklama, baslik);
    res.status(status).send(response);
}

exports.updateRapor = async (req, res) => {
    const ogrenciNo = req.params.id;
    const stajId = req.params.stajId;
    const { raporId, aciklama, baslik } = req.body
    const { status, response } = await ogrenciService.updateRapor(ogrenciNo, stajId, raporId, aciklama, baslik);
    res.status(status).send(response);
}

exports.getOgrenci = async (req, res) => {
    const ogrenciNo = req.params.id;
    const { status, response } = await ogrenciService.getOgrenci(ogrenciNo);
    res.status(status).send(response);
}

exports.printBasvuru = async (req, res) => {
    const { stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer } = req.body;
    const { status, response } = await ogrenciService.printBasvuru(stajId, babaAdi, anaAdi, dogumYeri, dogumTarihi, tcNo, seriNo, kayitliOlduguIl, kayitliOlduguIlce, mahalle, ciltNo, aileSiraNo, siraNo, verildigiYer);
    res.status(status).send(response);
}