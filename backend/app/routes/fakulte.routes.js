const controller = require("../controllers/fakulte.controller");

module.exports = function (app) {
    app.get(`/api/fakulte/staj`, controller.getStajList);
    app.get(`/api/fakulte/search/staj`, controller.searchStajList);
    app.get(`/api/fakulte/staj/:id`, controller.getStaj);
    app.get(`/api/fakulte/staj/:id/rapor`, controller.getStajRapor);
    app.put(`/api/fakulte/staj/:id`, controller.changeStajStatus);
    app.post(`/api/fakulte/staj`, controller.approveStaj);
    app.post(`/api/fakulte/sicil`, controller.printSicil);
    app.post(`/api/fakulte/basvuru`, controller.printBasvuru);
    app.post(`/api/fakulte/defter`, controller.printDefter);
    app.post(`/api/fakulte/kabul-edilen-gun`, controller.changeStajGunSayisi);
}