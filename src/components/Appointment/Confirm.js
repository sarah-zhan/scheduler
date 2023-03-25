import React from 'react';
import Button from 'components/Button';
import useVisualMode from 'hooks/useVisualMode';

const DELETING = 'DELETING';

export default function Confirm(props) {

	const { mode, transition, back } = useVisualMode(

	);

	return (
		<main className='appointment__card appointment__card--confirm'>
			<h1 className='text--semi-bold'>Delete the appointment?</h1>
			<section className='appointment__actions'>
				<Button
					onClick={ props.onCancel }
					danger
					onCancel={ () => back() }
				>
					Cancel
				</Button>
				<Button
					onClick={ props.onConfirm }
					danger
					onConfirm={ () => transition(DELETING) }
				>
					Confirm
				</Button>
			</section>
		</main>
	);
}
