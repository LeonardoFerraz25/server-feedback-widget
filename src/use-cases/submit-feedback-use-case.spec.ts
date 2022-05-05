import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const creatFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: creatFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Envio de feedback', () => {
  it('Espera que seja possivel enviar um feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,testestestestest.jpg',
    })).resolves.not.toThrow();

    expect(creatFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  })

  it('Espera que não seja possivel enviar um feedback sem um type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,testestestestest.jpg',
    })).rejects.toThrow();
  })

  it('Espera que não seja possivel enviar um feedback sem um comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,testestestestest.jpg',
    })).rejects.toThrow();
  })

  it('Espera que não seja possivel enviar um feedback com uma screnshot invalida', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'testestestestest.jpg',
    })).rejects.toThrow();
  })
});