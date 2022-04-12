# Nodemailer form

## About

An express server that renders a form for sending emails.

## Features

Send an email to <bar@example.com> and <baz@example.com> from an Ethereal mail account. An Ethereal account is usually used for testing purposes when using Nodemailer.

After submitting the form, watch the console for the Preview URL:

```bash
[Object: null prototype] {
  name: 'John',
  company: 'Acme',
  email: 'john@example.com',
  phone: '111-111-1111',
  message: 'Some random thoughts...'
}
Message sent: <97e4964a-1f88-cd8a-20fd-325134545b34@ethereal.email>
Preview URL: https://ethereal.email/message/YlWwnaE7hgPIPaFhYlWy9GeMAAbHwLhHAAAAAqhMHx0bv90TQymBMTLbLuo
```

The Preview URL shows the sent email:

![screenshot](Screenshot%20Ethereal%20Email.png)

## Running

Clone the repo and run either `npm start` (or `npm run dev` for using `nodemon`).

## Acknowledgment

Thanks to [Brad Traversy](https://github.com/bradtraversy) for his [tutorial](https://www.youtube.com/watch?v=oaJq1mQ3dFI&list=PLillGF-RfqbZ2ybcoD2OaabW2P7Ws8CWu&index=14).
