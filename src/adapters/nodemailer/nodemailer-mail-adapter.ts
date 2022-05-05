import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6bb7c2c441da6a",
    pass: "04d4512be9bd6b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback <prologo@feedback.com>',
      to: 'Leonardo Ferraz <leonardo.ferrazn@gmail.com>',
      subject,
      html: body,
    });
  };
}