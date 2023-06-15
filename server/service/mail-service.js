import nodemailer from 'nodemailer';
import '../config.js';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activation account' + process.env.API_URL,
        text: 'This is a test email.',
        html: `
          <div>
            <h1>For activate your account click on link</h1>
            <a href='${link}'>${link}</a>
          </div>
        `,
      });
      console.log('Email sent on: ' + info.to + 'messageID:' + info.messageId);
    } catch (e) {
      console.error('Error sending email:', e);
    }
  }
}

export default new MailService();
