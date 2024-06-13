const db = require("../models");
const Firma = db.firma;
const FirmaYetkili = db.firmaYetkili;
const Staj = db.staj;
const Rapor = db.rapor;
const Sicil = db.sicil;
const sendMail = require('../config/mail');

exports.getFirmaList = async () => {
    const firmaList = await Firma.findAll();
    return { status: 200, response: firmaList }
}

exports.getFirma = async (firmaId) => {
    const firma = await Firma.findOne({ where: { id: firmaId } });
    return { status: 200, response: firma }
}

exports.getFirmaYetkiliList = async (firmaId) => {
    const firmaYetkiliList = await FirmaYetkili.findAll({ where: { firmaId: firmaId } });
    return { status: 200, response: firmaYetkiliList }
}

exports.getFirmaYetkili = async (firmaYetkiliId) => {
    const firmaYetkili = await FirmaYetkili.findOne({ where: { id: firmaYetkiliId } });
    return { status: 200, response: firmaYetkili }
}

exports.getFirmaYetkiliStajList = async (firmaYetkiliId) => {
    const stajList = await Staj.findAll({ where: { firmaYetkiliId: firmaYetkiliId } });
    return { status: 200, response: stajList }
}

exports.getFirmaYetkiliRapors = async (firmaYetkiliId) => {
    let filteredStajList = [];
    let filteredRaporList = [];
    const stajList = await Staj.findAll({ where: { firmaYetkiliId: firmaYetkiliId, durum: 'Basvuru Onaylandı' } });
    const raporList = await Rapor.findAll({ where: { durum: 'Onay Bekliyor' } });
    stajList.forEach(e => filteredStajList.push(e));
    raporList.forEach(e => filteredRaporList.push(e));

    let currentRapors = [];
    for (const rapor of filteredRaporList) {
        for (const staj of filteredStajList) {
            if (rapor.stajId === staj.id) {
                let item = {
                    stajId: rapor.stajId,
                    raporId: rapor.id,
                    tarih: rapor.tarih,
                    ogrenciNo: staj.ogrenciNo,
                    durum: rapor.durum
                }
                currentRapors.push(item)
            }
        }
    }
    return { status: 200, response: currentRapors }
}

exports.getFirmaYetkiliStaj = async (firmaYetkiliId, stajId) => {
    const staj = await Staj.findOne({ where: { firmaYetkiliId: firmaYetkiliId, id: stajId } });
    return { status: 200, response: staj }
}

exports.getFirmaYetkiliRaporList = async (firmaYetkiliId, stajId) => {
    const staj = await Staj.findOne({ where: { firmaYetkiliId: firmaYetkiliId, id: stajId } });
    if (!staj) {
        return { status: 400, response: { message: 'Hatalı Giriş' } }
    }
    const rapors = await Rapor.findAll({ where: { stajId: stajId } })
    return { status: 200, response: rapors }
}

exports.changeRaporStatus = async (firmaYetkiliId, stajId, raporId, durum) => {
    const staj = await Staj.findOne({ where: { firmaYetkiliId: firmaYetkiliId, id: stajId } });
    if (!staj) {
        return { status: 400, response: { message: 'Hatalı Giriş' } }
    }
    const rapor = await Rapor.update({ durum: durum }, { where: { stajId: stajId, id: raporId } })
    return { status: 200, response: rapor }
}

exports.sendAuthFirmaYetkili = async (firmaYetkiliId) => {
    const firmaYetkili = await FirmaYetkili.findOne({ where: { id: firmaYetkiliId } });
    const userName = firmaYetkili.eposta;
    const sifre = firmaYetkili.sifre;
    let mailTemplate = `
    <div>
        <div><strong>Kullanıcı Adı:</strong> ${userName}</div>
        <div><strong>Şifre:</strong> ${sifre}</div>
    </div>`
    const mailStatus = await sendMail(userName, mailTemplate);
    if (mailStatus)
        return { status: 200, response: { message: 'Firma yetkili epostasına giriş bilgileri gönderildi' } }
    else
        return { status: 400, response: { message: 'E-posta hatası' } }
}

exports.updateFirma = async (firmaId, firmaAdi, telefon, adres, hizmetAlani) => {
    if (!firmaId) {
        return { status: 400, response: { message: 'Hatalı Giriş' } }
    }
    const firma = await Firma.update({ firmaAdi: firmaAdi, telefon: telefon, adres: adres, hizmetAlani: hizmetAlani }, { where: { id: firmaId } });
    return { status: 200, response: { message: 'Firma bilgileri başarıyla güncellendi' } }
}

exports.updateFirmaYetkili = async (firmaYetkiliId, eposta, isim, soyisim, gorev) => {
    if (!firmaYetkiliId) {
        return { status: 400, response: { message: 'Hatalı Giriş' } }
    }
    const firmaYetkili = await FirmaYetkili.update({ eposta: eposta, isim: isim, soyisim: soyisim, gorev: gorev }, { where: { id: firmaYetkiliId } });
    return { status: 200, response: { message: 'Firma yetkilisinin bilgileri başarıyla güncellendi' } }
}

exports.updateSicil = async (stajId, subeBirim, devamDurumu, devamDurumuDusunce, calismaGayreti, calismaGayretiDusunce, isiTamYapma, isiTamYapmaDusunce, isYeriTutumu, isYeriTutumuDusunce) => {
    if (!stajId) {
        return { status: 400, response: { message: 'Hatalı Giriş' } }
    }
    const staj = await Staj.update({ durum: 'Firma Onayı' }, { where: { id: stajId } })
    const sicil = await Sicil.update({ subeBirim: subeBirim, devamDurumu: devamDurumu, devamDurumuDusunce: devamDurumuDusunce, calismaGayreti: calismaGayreti, calismaGayretiDusunce: calismaGayretiDusunce, isiTamYapma: isiTamYapma, isiTamYapmaDusunce: isiTamYapmaDusunce, isYeriTutumu: isYeriTutumu, isYeriTutumuDusunce: isYeriTutumuDusunce }, { where: { stajId: stajId } });
    return { status: 200, response: { message: 'Gizli sicil başarıyla gönderildi' } }
}