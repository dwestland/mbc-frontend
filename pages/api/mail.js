// const mail = require('@sendgrid/mail')

import mail from '@sendgrid/mail'

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default function init(req, res) {
  const body = JSON.parse(req.body)

  const message = `
  Name: ${body.name}\r\n
  Email: ${body.email}\r\n
  Message: ${body.message}\r\n
  `

  const data = {
    to: 'don@westland.net',
    from: 'postmaster@westland.net',
    subject: `MyBeachCams Message from ${body.name}`,
    text: message,
  }

  mail.send(data)

  res.status(200).json({ status: 'OK' })
}
