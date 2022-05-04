import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6bb7c2c441da6a",
    pass: "04d4512be9bd6b"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot} = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedback <prologo@feedback.com>',
    to: 'Leonardo Ferraz <leonardo.ferrazn@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div>`,
      `<p>Tipo do Feedback: ${ type }</p>`,
      `<p>Comentario: ${ comment }</p>`,
      `</div>`
    ].join('\n')
  });
  
  return res.status(201).json({ data: feedback});
})

app.listen(3333, () => {
  console.log('HTTP server running');  
})