import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackCaseRequest) {
    const { type, comment, screenshot} = request;

    if (!type) throw new Error('Type is required.');
    if (!comment) throw new Error('comment is required.');
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div>`,
        `<p>Tipo do Feedback: ${ type }</p>`,
        `<p>Comentario: ${ comment }</p>`,
        `</div>`
      ].join('\n')
    })
  }
}