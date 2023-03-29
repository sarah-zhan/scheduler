import React from 'react';
import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';


export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData();

	console.log(state);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const interviewers = getInterviewersForDay(state, state.day);
	console.log('interviewers: ', interviewers);

	console.log('state: ', state);

	const schedule = dailyAppointments.map(appointment => {
		// console.log('appointment: ', appointment);
		const interview = getInterview(state, appointment.interview);

		return (
			<Appointment
				key={ appointment.id }
				id={ appointment.id }
				time={ appointment.time }
				interview={ interview }
				// interviewers={ state.interviewers }
				interviewers={ interviewers }
				bookInterview={ bookInterview }
				cancelInterview={ cancelInterview }
			/>
		);

	});



	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={ state.days } value={ state.day } onChange={ setDay } />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{ schedule }
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	);
}
