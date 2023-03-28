import React, { useReducer } from 'react';


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { /* insert logic */ };
    case SET_APPLICATION_DATA:
      return { /* insert logic */ };
    case SET_INTERVIEW: {
      return; /* insert logic */
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );

  }

}

function SpotCalculator() {
  const [state, dispatch] = useReducer(reducer, 0);


  return (
    <div>

    </div>
  );
}