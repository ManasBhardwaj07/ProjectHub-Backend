import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,       // ✅ smtp.gmail.com
      port: process.env.EMAIL_PORT,       // ✅ 587
      secure: false,                      // ✅ TLS - required for Gmail with port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ProjectHub Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
