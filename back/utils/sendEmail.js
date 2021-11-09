const nodemailer = require('nodemailer');

const sendEmail = async options =>{

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e535fd6471aa73",
            pass: "f6dd02fbdd2836"
        }
    });

    const message = {
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}`,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transport.sendMail(message);


}

module.exports = sendEmail;
