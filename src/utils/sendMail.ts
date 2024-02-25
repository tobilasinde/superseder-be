import { createTransport } from 'nodemailer'
import { Options } from 'nodemailer/lib/mailer'

export async function sendEmail(data: Options) {
	try {
		if (!data.from) data.from = process.env.MAIL_FROM_NAME
		// Set Mail Authentications
		let transporter = createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			secure: true,
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		})
		// Send Emails
		transporter.sendMail(data, function (error, info) {
			if (error) {
				console.log(error)
				return {
					status: false,
					message: error,
					email: data.to,
				}
			} else {
				console.log('Email sent successfully to ' + data.to)
				return {
					status: true,
					message: 'Email sent successfully',
					email: data.to,
				}
			}
		})
	} catch (error) {
		console.log(error)
		return error
	}
}
