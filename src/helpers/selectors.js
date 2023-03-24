export function getAppointmentsForDay(state, selectedDay) {
  const filteredDays = state.days.filter(day => day.name === selectedDay);
  console.log('filteredDays: ', filteredDays);
  if (filteredDays.length === 0) {
    return [];
  }
  const appointments = filteredDays[0].appointments.map((appointmentId) => state.appointments[appointmentId]);

  return appointments;
}