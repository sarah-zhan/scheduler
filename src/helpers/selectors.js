function getAppointmentsForDay(state, selectedDay) {
  const filteredDays = state.days?.filter(day => day.name === selectedDay);
  if (filteredDays?.length === 0) {
    return [];
  }
  const appointments = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);

  return appointments;
}


function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId];
  const output = {
    student: interview.student,
    interviewer: interviewerObj
  };
  return output;

}


function getInterviewersForDay(state, selectedDay) {

  const daySelected = state.days.find(day => day.name === selectedDay);

  if (!daySelected) {
    return [];
  }
  const interviewers = daySelected.interviewers.map(interviewerId => {
    return state.interviewers[interviewerId];
  });
  return interviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };