import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const EDIT = 'EDIT';
const DELETE = 'DELETE';
const DELETING = 'DELETING';

export default function Appointment(props) {
	// console.log('props: ', props);

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
	console.log(mode);

	const onSave = (student, interviewer) => {
		console.log('student: ', student);

		transition(SAVING);
		save(student, interviewer);
	};

	const onCancel = () => back();
	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer
		};
		const result = props.bookInterview(props.id, interview);
		result.then(() => transition(SHOW));

	};

	const onDelete = () => {
		transition(DELETE, true);
	};

	const onConfirm = () => {
		transition(DELETING, true);
		props.deleteInterview(props.id).then(() => transition(EMPTY));
	};

	const onEdit = (props.interview.student, props.interview.interviewer) => {
		transition(SHOW);
	};


	return (
		<article className='appointment'>
			<Header time={ props.time } />
			{ mode === SHOW && (
				<Show
					student={ props.interview.student }
					interviewer={ props.interview.interviewer }
					onEdit={ onEdit }
					onDelete={ onDelete }
				/>
			) }
			{ mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } /> }
			{ mode === CREATE && <Form
				interviewers={ props.interviewers }
				onCancel={ onCancel }
				onSave={ onSave } />
			}
			{ mode === SAVING && <Status message='Saving' /> }
			{ mode === DELETE && <Confirm onConfirm={ onConfirm } onCancel={ back } /> }
			{ mode === DELETING && <Status message='Deleting' /> }
		</article>
	);
}
