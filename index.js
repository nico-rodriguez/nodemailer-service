const express = require('express');
const { join } = require('path');
const { engine } = require('express-handlebars');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const PORT = 3000;

// View engine setup
app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static assets
app.use('/public', express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', async function (req, res) {
  console.log(req.body);
  const { name, company, email, phone, message } = req.body;
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Company: ${company}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  let testAccount = {
    name: process.env.NAME,
    user: process.env.USER,
    pass: process.env.PASS,
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodemailer contact" <steve.daugherty33@ethereal.email>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Node contact request', // Subject line
      text: 'Hello world?', // plain text body
      html: output, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render('contact', { msg: 'Email has been sent!' });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));
