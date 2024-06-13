const fakulteService = require("../services/fakulte.service");

exports.getStajList = async (req, res) => {
    const { durum } = req.query
    const { status, response } = await fakulteService.getStajList(durum);
    res.status(status).send(response);
}

exports.searchStajList = async (req, res) => {
    const { durum, ogrenciNo } = req.query
    const { status, response } = await fakulteService.searchStajList(durum, ogrenciNo);
    res.status(status).send(response);
}

exports.changeStajStatus = async (req, res) => {
    const { durum } = req.body
    const stajId = req.params.id;
    const { status, response } = await fakulteService.changeStatus(stajId, durum);
    res.status(status).send(response);
}

exports.getStaj = async (req, res) => {
    const stajId = req.params.id;
    const { status, response } = await fakulteService.getStaj(stajId);
    res.status(status).send(response);
}

exports.getStajRapor = async (req, res) => {
    const stajId = req.params.id;
    const { status, response } = await fakulteService.getStajRapor(stajId);
    res.status(status).send(response);
}

exports.approveStaj = async (req, res) => {
    const { stajId } = req.body;
    const { status, response } = await fakulteService.approveStaj(stajId);
    res.status(status).send(response);
}

exports.printSicil = async (req, res) => {
    const { stajId } = req.body;
    const { status, response } = await fakulteService.printSicil(stajId);
    res.status(status).send(response);
}

exports.printBasvuru = async (req, res) => {
    const { stajId } = req.body;
    const { status, response } = await fakulteService.printBasvuru(stajId);
    res.status(status).send(response);
}

exports.printDefter = async (req, res) => {
    const { stajId } = req.body;
    const { status, response } = await fakulteService.printDefter(stajId);
    res.status(status).send(response);
}

exports.changeStajGunSayisi = async (req, res) => {
    const { stajId, gunSayisi } = req.body;
    const { status, response } = await fakulteService.changeStajGunSayisi(stajId, gunSayisi);
    res.status(status).send(response);
}