const db = require("../models");
const Ogrenci = db.ogrenci;
const FirmaYetkili = db.firmaYetkili;
const Fakulte = db.fakulte;
const axios = require('axios');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/token')
const randomPassword = require("../config/password");
const ogrenciEndpoint = 'https://ubs5.cumhuriyet.edu.tr/webServis/webServisOgrenci.php?ogr_no='
const akademisyenEndpoint = 'https://ubs5.cumhuriyet.edu.tr/webServis/webServisPersonel.php?tc_kimlik_no='
const lodash = require('lodash');
const sendMail = require('../config/mail');

exports.login = async (userName, password, userType) => {
    switch (userType) {
        case 'Ogrenci':
            const data = await Ogrenci.findOne({ where: { ogrenciNo: userName } })
            if (data) {
                if (data.sifre !== password) {
                    return { status: 400, response: { message: 'Kullanıcı adı veya şifre hatalı' } }
                }
                const token = jwt.sign({ userName }, secretKey, { expiresIn: '2h' });
                let loginDto = lodash.cloneDeep(data);
                delete loginDto.sifre;
                delete loginDto.updatedAt;
                delete loginDto.createdAt;
                loginDto.token = token;
                loginDto.userType = userType;
                await Ogrenci.update({ token: token }, { where: { ogrenciNo: userName } });
                return { status: 200, response: loginDto }
            } else {
                let ogrenci = await axios.get(`${ogrenciEndpoint}${userName}`);
                if (password !== ogrenci.data.TC_KIMLIK_NO) {
                    return { status: 400, response: { message: 'Giriş bilgileri yanlış' } }
                }
                if (ogrenci.data === 'Ogrenci Yok') {
                    return { status: 400, response: { message: 'Öğrenci Bulunamadı' } }
                }
                const token = jwt.sign({ userName }, secretKey, { expiresIn: '2h' });
                const sifre = randomPassword(8);
                let newOgrenci = await Ogrenci.create({
                    ogrenciNo: ogrenci.data.OGRENCI_NO,
                    isim: ogrenci.data.AD,
                    soyisim: ogrenci.data.SOYAD,
                    eposta: ogrenci.data.EPOSTA1,
                    sinif: ogrenci.data.SINIF,
                    donem: ogrenci.data.AKTIF_DONEM,
                    telefon: ogrenci.data.GSM1,
                    fotograf: ogrenci.data.FOTO_URL,
                    sifre: sifre,
                    token: token,
                });
                let mailTemplate = `
                    <div>
                        <div><strong>Kullanıcı Adı:</strong> ${userName}</div>
                        <div><strong>Şifre:</strong> ${sifre}</div>
                    </div>`
                const mailStatus = await sendMail(ogrenci.data.EPOSTA1, mailTemplate);
                if (mailStatus)
                    return { status: 200, response: { message: 'Öğrenci epostasına giriş bilgileri gönderildi' } }
                else
                    return { status: 400, response: { message: 'E-posta hatası' } }
            }
        case 'Firma':
            const firmaData = await FirmaYetkili.findOne({ where: { eposta: userName } })
            if (!firmaData) {
                return { status: 400, response: { message: 'Firma Bulunamadı' } }
            }
            if (firmaData.sifre !== password) {
                return { status: 400, response: { message: 'Kullanıcı adı veya şifre hatalı' } }
            }
            const token = jwt.sign({ userName }, secretKey, { expiresIn: '2h' });
            let loginDto = lodash.cloneDeep(firmaData);
            delete loginDto.sifre;
            delete loginDto.updatedAt;
            delete loginDto.createdAt;
            delete loginDto.createdBy;
            loginDto.token = token;
            loginDto.userType = userType;
            await FirmaYetkili.update({ token: token }, { where: { eposta: userName } });
            return { status: 200, response: loginDto }
        case 'Fakulte':
            const fakulteData = await Fakulte.findOne({ where: { tcNo: userName } })
            if (fakulteData) {
                if (fakulteData.sifre !== password) {
                    return { status: 400, response: { message: 'Kullanıcı adı veya şifre hatalı' } }
                }
                const token = jwt.sign({ userName }, secretKey, { expiresIn: '2h' });
                let loginDto = lodash.cloneDeep(fakulteData);
                delete loginDto.sifre;
                delete loginDto.updatedAt;
                delete loginDto.createdAt;
                loginDto.token = token;
                loginDto.userType = userType;
                await Fakulte.update({ token: token }, { where: { eposta: userName } });
                return { status: 200, response: loginDto }
            } else {
                let akademisyen = await axios.get(`${akademisyenEndpoint}${userName}`);
                if (password !== akademisyen.data.GSM1) {
                    return { status: 400, response: { message: 'Giriş bilgileri yanlış' } }
                }
                if (akademisyen.data.TCK.toLowerCase().startsWith('hata')) {
                    return { status: 400, response: { message: 'Öğrenci Bulunamadı' } }
                }
                const token = jwt.sign({ userName }, secretKey, { expiresIn: '2h' });
                const sifre = randomPassword(8);
                let newAkademisyen = await Fakulte.create({
                    tcNo: akademisyen.data.TCK,
                    isim: akademisyen.data.ADI,
                    soyisim: akademisyen.data.SOYADI,
                    eposta: akademisyen.data.EPOSTA1,
                    telefon: akademisyen.data.GSM1,
                    fotograf: akademisyen.data.FOTO_URL,
                    sifre: sifre,
                    token: token,
                });
                let mailTemplate = `
                    <div>
                        <div><strong>Kullanıcı Adı:</strong> ${userName}</div>
                        <div><strong>Şifre:</strong> ${sifre}</div>
                    </div>`
                const mailStatus = await sendMail(akademisyen.data.EPOSTA1, mailTemplate);
                if (mailStatus)
                    return { status: 200, response: { message: 'Akademik personel epostasına giriş bilgileri gönderildi' } }
                else
                    return { status: 400, response: { message: 'E-posta hatası' } }
            }
        default:
            return { status: 400, response: { message: 'Geçersiz kullanıcı türü' } }
    }
}

exports.changePassword = async (userType, userName, oldPassword, newPassword, confirmNewPassword) => {
    switch (userType) {
        case 'Ogrenci':
            const data = await Ogrenci.findOne({ where: { ogrenciNo: userName, sifre: oldPassword } });
            if (!data) {
                return { status: 400, response: { message: 'Eski şifre yanlış girildi' } }
            }
            if (newPassword !== confirmNewPassword) {
                return { status: 400, response: { message: 'Şifreler uyuşmuyor' } }
            }
            await Ogrenci.update({ sifre: newPassword }, { where: { ogrenciNo: userName } });
            return { status: 200, response: { message: 'Şifre başarıyla değiştirildi' } }
        case 'Firma':
            const firmaData = await FirmaYetkili.findOne({ where: { eposta: userName, sifre: oldPassword } })
            if (!firmaData) {
                return { status: 400, response: { message: 'Eski şifre yanlış girildi' } }
            }
            if (newPassword !== confirmNewPassword) {
                return { status: 400, response: { message: 'Şifreler uyuşmuyor' } }
            }
            await FirmaYetkili.update({ sifre: newPassword }, { where: { eposta: userName } });
            return { status: 200, response: { message: 'Şifre başarıyla değiştirildi' } }
        case 'Fakulte':
            const fakulteData = await Fakulte.findOne({ where: { tcNo: userName, sifre: oldPassword } })
            if (!fakulteData) {
                return { status: 400, response: { message: 'Eski şifre yanlış girildi' } }
            }
            if (newPassword !== confirmNewPassword) {
                return { status: 400, response: { message: 'Şifreler uyuşmuyor' } }
            }
            await Fakulte.update({ sifre: newPassword }, { where: { tcNo: userName } });
            return { status: 200, response: { message: 'Şifre başarıyla değiştirildi' } }
        default:
            return { status: 400, response: { message: 'Geçersiz kullanıcı türü' } }
    }
}
