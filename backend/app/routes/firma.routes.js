const controller = require("../controllers/firma.controller");

module.exports = function (app) {
    app.get(`/api/firma`, controller.getFirmaList);
    app.get(`/api/firma/:id`, controller.getFirma);
    app.get(`/api/firma/:id/firmaYetkili`, controller.getFirmaYetkiliList);
    app.post(`/api/firma/:id/update`, controller.updateFirma);
    app.get(`/api/firmaYetkili/:id`, controller.getFirmaYetkili);
    app.get(`/api/firmaYetkili/:id/staj`, controller.getFirmaYetkiliStajList);
    app.get(`/api/firmaYetkili/:id/rapors`, controller.getFirmaYetkiliRapors);
    app.get(`/api/firmaYetkili/:id/staj/:stajId`, controller.getFirmaYetkiliStaj);
    app.get(`/api/firmaYetkili/:id/staj/:stajId/rapor`, controller.getFirmaYetkiliRaporList);
    app.post(`/api/firmaYetkili/:id/staj/:stajId/rapor`, controller.changeRaporStatus);
    app.post(`/api/firmaYetkili/:id/update`, controller.updateFirmaYetkili);
    app.post(`/api/firmaYetkili/send-auth`, controller.sendAuthFirmaYetkili);
    app.post(`/api/firmaYetkili/update-sicil`, controller.updateSicil);
}