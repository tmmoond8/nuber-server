import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandboxac6172d794714a8e826947e6bb8c4c79.mailgun.org'
})

export default mailGunClient;