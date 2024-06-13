const firmaService = require("../services/firma.service");

exports.getFirmaList = async (req, res) => {
    const { status, response } = await firmaService.getFirmaList();
    res.status(status).send(response);
}

exports.getFirma = async (req, res) => {
    const firmaId = req.params.id;
    const { status, response } = await firmaService.getFirma(firmaId);
    res.status(status).send(response);
}

exports.getFirmaYetkiliList = async (req, res) => {
    const firmaId = req.params.id;
    const { status, response } = await firmaService.getFirmaYetkiliList(firmaId);
    res.status(status).send(response);
}

exports.getFirmaYetkili = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const { status, response } = await firmaService.getFirmaYetkili(firmaYetkiliId);
    res.status(status).send(response);
}

exports.getFirmaYetkiliStajList = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const { status, response } = await firmaService.getFirmaYetkiliStajList(firmaYetkiliId);
    res.status(status).send(response);
}

exports.getFirmaYetkiliRapors = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const { status, response } = await firmaService.getFirmaYetkiliRapors(firmaYetkiliId);
    res.status(status).send(response);
}

exports.getFirmaYetkiliStaj = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const stajId = req.params.stajId;
    const { status, response } = await firmaService.getFirmaYetkiliStaj(firmaYetkiliId, stajId);
    res.status(status).send(response);
}

exports.getFirmaYetkiliRaporList = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const stajId = req.params.stajId;
    const { status, response } = await firmaService.getFirmaYetkiliRaporList(firmaYetkiliId, stajId);
    res.status(status).send(response);
}

exports.changeRaporStatus = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const stajId = req.params.stajId;
    const { raporId, durum } = req.body;
    const { status, response } = await firmaService.changeRaporStatus(firmaYetkiliId, stajId, raporId, durum);
    res.status(status).send(response);
}

exports.sendAuthFirmaYetkili = async (req, res) => {
    const { firmaYetkiliId } = req.body;
    const { status, response } = await firmaService.sendAuthFirmaYetkili(firmaYetkiliId);
    res.status(status).send(response);
}

exports.updateFirma = async (req, res) => {
    const firmaId = req.params.id;
    const { firmaAdi, telefon, adres, hizmetAlani } = req.body;
    const { status, response } = await firmaService.updateFirma(firmaId, firmaAdi, telefon, adres, hizmetAlani);
    res.status(status).send(response);
}

exports.updateFirmaYetkili = async (req, res) => {
    const firmaYetkiliId = req.params.id;
    const { eposta, isim, soyisim, gorev } = req.body;
    const { status, response } = await firmaService.updateFirmaYetkili(firmaYetkiliId, eposta, isim, soyisim, gorev);
    res.status(status).send(response);
}

exports.updateSicil = async (req, res) => {
    const { stajId, subeBirim, devamDurumu, devamDurumuDusunce, calismaGayreti, calismaGayretiDusunce, isiTamYapma, isiTamYapmaDusunce, isYeriTutumu, isYeriTutumuDusunce } = req.body;
    const { status, response } = await firmaService.updateSicil(stajId, subeBirim, devamDurumu, devamDurumuDusunce, calismaGayreti, calismaGayretiDusunce, isiTamYapma, isiTamYapmaDusunce, isYeriTutumu, isYeriTutumuDusunce);
    res.status(status).send(response);
}