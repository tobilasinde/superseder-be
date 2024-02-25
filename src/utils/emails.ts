import db from '../database'
import { findOne } from '../database/functions'
import emails from '../config/email.config.json'
import { generateHash } from './functions'
import { sendEmail } from './sendMail'

export const welcomeEmail = async (id: string, url: string) => {
	const user = await findOne('User', {
		where: { id },
		include: { model: db['Auth'] },
		raw: false,
	})
	let email
	if (user.auth.hash) {
		const e = { ...emails.invitation_for_user_in_the_system }
		e.text = e.text.replace('{{link}}', url + '/auth/login/')
		email = e
	} else {
		const e = { ...emails.invitation_for_new_user }
		e.text = e.text.replace(
			'{{link}}',
			url +
				'/auth/reset-password/' +
				user.auth.email +
				'/' +
				generateHash(user.auth.reset_token, user.email).hash
		)
		email = e
	}
	sendEmail({
		to: user.auth.email,
		...email,
	})
}
export const resetPasswordEmail = async (id: string, url: string) => {
	const auth = await findOne('Auth', {
		where: { id },
		attributes: ['email', 'resetToken'],
	})
	const email = { ...emails.reset_password_request }
	email.text = email.text
		.replace(
			'{{link}}',
			url +
				'/auth/reset-password/' +
				auth.email +
				'/' +
				generateHash(auth.reset_token, auth.email).hash
		)
		.replace('{{email}}', auth.email)
	sendEmail({
		to: auth.email,
		...email,
	})
}
export const createScheduleEmail = async (id: string) => {
	const schedule = await findOne('Schedule', {
		where: { id },
		include: [
			'Service',
			'Location',
			{
				model: db['UserSchedule'],
				include: [
					{ model: db['User'], attributes: ['email', 'firstname', 'lastname'] },
				],
			},
		],
		raw: false,
	})
	schedule.time_entries?.forEach((time_entry: { user: { email: string } }) => {
		const email = { ...emails.new_schedule }
		email.text = email.text
			.replace('{{service_name}}', schedule.Service?.name)
			.replace('{{location_name}}', schedule.Location?.name)
			.replace('{{address}}', schedule.Location?.address)
			.replace('{{date}}', schedule.date)
			.replace('{{time}}', schedule.startTime)
			.replace('{{duration}}', schedule.duration)
		sendEmail({
			to: time_entry.user.email,
			...email,
		})
	})
}
