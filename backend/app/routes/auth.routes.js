const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.post("/api/login", controller.login);
    app.post("/api/change-password", controller.changePassword);
}