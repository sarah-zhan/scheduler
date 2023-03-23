# Scheduler project breakdown

## Components

- Button v
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State: NO STATE
- Props: confirm (boolean), disabled (boolean), danger, boolean, onClick (function), clickable
- Used by: EVERYONE

### DayList

- State:NO STATE
- Props: days(array[{id, name,spots}]), day(string), setDay(function)
- Used by:

### DayListItem

- State: none
- Props:name(string), spots(number), seleted(boolean), setDay(function)
- Used by: DayList

### InterviewerList

- State:
- Props: interviewers(array), setInterviewer(function), interviewer(id)
- Used by:

### InterviewerListItem

- State: none
- Props: id(number), name(string), avatar(url), selected(boolean), setInterviewer(function)
- Used by: InterviewerList

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props: time(string)
- Used by:

### Appointment/Empty

- State:
- Props: onAdd(function)
- Used by:

### Appointment/Show

- State:
- Props: student(string), interviewer(object), onEdit(function), onDelete(function)
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props: message(string)
- Used by:

### Appointment/Error

- State:
- Props:
- Used by:

### Appointment/Confirm

- State:
- Props: message(string), onConfirm(function), onCancel(function)
- Used by:
