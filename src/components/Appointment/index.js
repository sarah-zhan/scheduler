import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
// const EDIT = 'EDIT';
// const DELETE = 'DELETE';

export default function Appointment(props) {
	// console.log('props: ', props);

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);


	const onSave = (student, interviewer) => {
		transition(SAVING);
		save(student, interviewer);
		transition(SHOW);
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

	return (
		<article className='appointment'>
			<Header time={ props.time } />
			{ mode === SHOW && (
				<Show
					student={ props.interview.student }
					interviewer={ props.interview.interviewer }
				// onEdit={ () => transition(EDIT) }
				// onDelete={ () => transition(DELETE) }
				/>
			) }
			{ mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } /> }
			{ mode === CREATE && <Form
				interviewers={ props.interviewers }
				onCancel={ onCancel }
				onSave={ onSave } />
			}
		</article>
	);
}
