// import jwt from 'jsonwebtoken';

const config = require('../../config/env');
const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({ apiKey: config.mailgunApiKey, domain: config.mailgunDomain });

function testEmail(req, res) {
  const data = {
    from: 'test@helpinghand.io',
    to: req.body.mail,
    subject: 'This is a test email',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS!'
  };

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.json({ success: body });
    }
  });
}

export default { testEmail };
