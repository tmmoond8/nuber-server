import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandboxac6172d794714a8e826947e6bb8c4c79.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "tmmoond8@gmail.com",
    to: "tmmoond8@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);;
};


export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello~ ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://number.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};