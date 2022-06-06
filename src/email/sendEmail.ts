import * as nodemailer from 'nodemailer';

export const sendEmail = async (authorEmail: string, token: any) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,

    auth: {
      user: process.env.USEREMAILID,
      pass: process.env.USERPASSWORD,
    },
  });
  const link = `http://localhost:30301/v1/forgotpassword/basic/confirm/${token}`;
  const info = await transporter.sendMail({
    from: '"Azi!!!!" <moksha.shah@azilen.com>',
    to: authorEmail,
    subject: 'Lms NestAssignment',
    text: 'lms buddy',
    html: `<body><b>You have registered in our app</b>
    <p>
    Please confirm your email here <a href="${link}">Please confirm email</a></p></body> "`,
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return Promise.resolve('sucessfull');
};
