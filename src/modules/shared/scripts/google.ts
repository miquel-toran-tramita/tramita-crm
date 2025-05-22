import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID, GOOGLE_APP_PASS } from '$env/static/private'


export const googleAuth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: GOOGLE_PROJECT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
})

export const sendGmail = async (to: string, subject: string, html: string, from: string = 'miquel@tramita.info') => {
  //const accessToken = await oAuth2Client.getAccessToken()
  let emailSended: boolean = false

  try {
    // Configura el transporte
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'miquel@tramita.info',
        pass: GOOGLE_APP_PASS,
      },
    })

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })

    emailSended = true
  } catch (err) {
    console.error(err)
  } finally {
    return emailSended
  }
}
