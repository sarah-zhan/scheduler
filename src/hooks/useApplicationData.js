import React, { useState, useEffect } from 'react';
import axios from 'axios';


const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

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
      .then(() => setState({ ...state, appointments }));

    //we need to return a value to go back to appointment index
  };

  const cancelInterview = (id) => {
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
      .then(() => setState({ ...state, appointments }));

  };


  const updateSpots = function (state, appointments, id) {

    const availableAppointments = appointments.filter(appointment => appointment.interview === null);
    // console.log('availableAppointments: ', availableAppointments);
    const spots = availableAppointments.length;
    const route = `/api/appointments/${id}`;
    const data = { availableAppointments };
    axios.put(route, data)
      .then(setState({ ...state, availableAppointments, spots }))
      .catch(response => {
        console.log('put response: ', response);

      });
    // return an updated days array
    return availableAppointments;
  };



  useEffect(() => {
    const promiseDays = axios.get('/api/days');
    const promiseAppointments = axios.get('/api/appointments');
    const promiseInterviewers = axios.get('/api/interviewers');

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;