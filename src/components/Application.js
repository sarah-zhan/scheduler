import React, { useState, useEffect } from 'react';
import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';
import axios from 'axios';


export default function Application(props) {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = day => setState(prev => ({ ...prev, day }));





	useEffect(() => {
		const promiseDays = axios.get('/api/days');
		const promiseAppointments = axios.get('/api/appointments');
		const promiseInterviewers = axios.get('/api/interviewers');

		Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
			.then(all => {
				setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
			});
	}, []);

	// console.log(state);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		const route = `/api/appointments/${id}`;
		const data = { interview };
		return axios.put(route, data)
			.then(setState({ ...state, appointments }))
			.catch(response => {
				console.log('put response: ', response);

			});

		//we need to return a value to go back to appointment index
	};

	const deleteInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null
		};
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		const route = `/api/appointments/${id}`;
		const data = null;
		return axios.delete(route, data)
			.then(setState({ ...state, appointments }))
			.catch(response => {
				console.log('delete response: ', response);

			});

	};

	const schedule = dailyAppointments.map(appointment => {
		// console.log('appointment: ', appointment);

		const interview = getInterview(state, appointment.interview);
		// const interviewers = getInterviewersForDay(state, state.interviewers);
		return (
			<Appointment
				key={ appointment.id }
				id={ appointment.id }
				time={ appointment.time }
				interview={ interview }
				interviewers={ state.interviewers }
				bookInterview={ bookInterview }
				deleteInterview={ deleteInterview }
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
