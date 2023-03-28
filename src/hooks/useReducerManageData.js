import React, { useReducer, useState } from 'react';



const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: state.day };
    case SET_APPLICATION_DATA:
      return { ...state, appointments: state.appointments };
    case SET_INTERVIEW:
      return { ...state, interview: state.interview };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );

  }

}

function useReducerManageData() {
  const [state, dispatch] = useReducer(reducer, {});

  const setDay = day => {
    dispatch({ type: SET_DAY, day });
  };

  const setInterview = (id, interview) => {
    dispatch({ type: SET_INTERVIEW, payload: { id, interview } });
  };



  return (
    <div>

    </div>
  );
}