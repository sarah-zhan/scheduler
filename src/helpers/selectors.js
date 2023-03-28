function getAppointmentsForDay(state, selectedDay) {
  const filteredDays = state.days.filter(day => day.name === selectedDay);
  // console.log('filteredDays: ', filteredDays);
  if (filteredDays.length === 0) {
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
  const appointment = getAppointmentsForDay(state, selectedDay);
  const interviewFound = getInterview(state, appointment.interview);
  if (!interviewFound) {
    return {};
  }
  const interviewers = state.interviewers.find(interviewer => interviewFound.interviewer === interviewer.id);
  console.log('interviewers: ', interviewers);

  return interviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };