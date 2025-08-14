exports.verificationMailTamplet = (otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify Your Email</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(to right, #f0f4f8, #d9e2ec);
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(90deg, #4f46e5, #3b82f6);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
      }
      .content {
        padding: 30px 25px;
        color: #333;
        text-align: center;
      }
      .content h2 {
        margin-top: 0;
        font-size: 22px;
        color: #111827;
      }
      .otp-box {
        margin: 25px auto;
        padding: 15px 0;
        width: 220px;
        background-color: #eef2ff;
        border: 2px dashed #6366f1;
        color: #3730a3;
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 5px;
        border-radius: 10px;
      }
      .message {
        margin-top: 20px;
        font-size: 16px;
        color: #555;
      }
      .footer {
        background-color: #f9fafb;
        text-align: center;
        padding: 20px;
        font-size: 13px;
        color: #888;
      }
      .highlight {
        font-weight: 600;
        color: #111827;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to The Wall</h1>
      </div>
      <div class="content">
        <h2>Email Verification Code</h2>
        <p class="message">Hi there 👋,<br/>Please use the following OTP to verify your email address:</p>
        <div class="otp-box">${otp}</div>
        <p class="message">This code will expire in <span class="highlight">10 minutes</span>. Please do not share it with anyone.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} EduSahayak. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};