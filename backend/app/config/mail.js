const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("sendgrid_api_key")

const sendMail = async (mailTarget, content) => {
    try {
        const msg = {
            to: mailTarget,
            from: 'kaynak_mail_adresi',
            subject: 'SCU - Staj Portalı',
            text: 'Sivas Cumhuriyet Üniversitesi Staj Portalı',
            html: content,
        }
        await sgMail.send(msg);
        return true;
    } catch (error) {
        console.log("mail hatası", error);
        return false;
    }
}

module.exports = sendMail;