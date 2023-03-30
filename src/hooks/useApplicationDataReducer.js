import { action } from '@storybook/addon-actions';
import { useReducer, useEffect } from 'react';
import axios from 'axios';


const useApplicationDataReducer = () => {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  function reducer(state, action) {
    const { days, appointments, interviewers } = action;
    if (action.type === SET_DAY) {
      return { ...state, days };
    }

    if (action.type === SET_APPLICATION_DATA) {
      return { ...state, days, appointments, interviewers };
    }

    if (action.type === SET_INTERVIEW) {
      return { ...state, appointments, days };
    }
  }

  const setDay = day => {
    dispatch({ type: SET_DAY, day });
  };

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
    // const data = { interview };
    return axios.put(route, { interview })
      .then(() => {
        const days = updateSpots(state, appointments);
        dispatch({ type: 'SET_INTERVIEW', appointments, days });
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
        dispatch({ type: SET_INTERVIEW, appointments, days });
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

    spots = dayObj.appointments.reduce((count, id) => !appointments[id].interview ? count + 1 : count);


    // spots = dayObj.appointments.reduce((count, id) => {
    //   const appointment = appointments[id];
    //   return !appointment.interview ? count + 1 : count;
    //   // if (!appointment.interview) {
    //   //   return count + 1;
    //   // }
    //   // return count;
    // });

    const day = { ...dayObj, spots };
    return state.days.map(d => d.name === state.day ? day : d);
  };


  useEffect(() => {
    const promiseDays = axios.get('/api/days');
    const promiseAppointments = axios.get('/api/appointments');
    const promiseInterviewers = axios.get('/api/interviewers');

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;

        dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots };

};
export default useApplicationDataReducer;