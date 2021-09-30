import nodemailer from 'nodemailer'


const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.mailtrap_host,
    port: process.env.mailtrap_port,
    // secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.mailtrap_user,
      pass: process.env.mailtrap_pass,
    },
  })

  const mailOptions = {
    from: "Email from <accounts@subflip.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: "<p>HTML version of the message</p>"
  }

  await transporter.sendMail(mailOptions)

}

export default sendEmail