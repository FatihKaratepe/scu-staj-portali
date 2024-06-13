const controller = require("../controllers/ogrenci.controller");

module.exports = function (app) {
    app.get(`/api/ogrenci/:id`, controller.getOgrenci);
    app.get(`/api/ogrenci/:id/staj`, controller.getStajList);
    app.post(`/api/ogrenci/:id/staj`, controller.addStaj);
    app.get(`/api/ogrenci/:id/staj/:stajId`, controller.getStaj);
    app.get(`/api/ogrenci/:id/staj/:stajId/rapor`, controller.getStajRaporList);
    app.post(`/api/ogrenci/:id/firma`, controller.addFirma);
    app.post(`/api/ogrenci/:id/firmaYetkili`, controller.addFirmaYetkili);
    app.post(`/api/ogrenci/:id/staj/:stajId/rapor`, controller.addRapor);
    app.put(`/api/ogrenci/:id/staj/:stajId/rapor`, controller.updateRapor);
    app.post(`/api/ogrenci/basvuru`, controller.printBasvuru);
}