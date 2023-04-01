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
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      });
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
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      });

  };


  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find(d => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    return state.days.map(d => d.name === state.day ? day : d);
  };


  // use axios to fetch the data
  useEffect(() => {
    const promiseDays = axios.get('/api/days');
    const promiseAppointments = axios.get('/api/appointments');
    const promiseInterviewers = axios.get('/api/interviewers');

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
};
export default useApplicationData;