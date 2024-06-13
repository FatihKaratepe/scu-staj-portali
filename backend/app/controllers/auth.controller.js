const authService = require("../services/auth.service");

exports.login = async (req, res) => {
    const { userName, password, userType } = req.body;
    const { status, response } = await authService.login(userName, password, userType);
    res.status(status).send(response);
}

exports.changePassword = async (req, res) => {
    const { userType, userName, oldPassword, newPassword, confirmNewPassword } = req.body;
    const { status, response } = await authService.changePassword(userType, userName, oldPassword, newPassword, confirmNewPassword);
    res.status(status).send(response);
}