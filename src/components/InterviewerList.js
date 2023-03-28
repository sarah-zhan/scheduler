import React from 'react';
import './InterviewerList.scss';
import InterViewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
	console.log('props: ', props);

	const list = Object.values(props.interviewers).map(interviewer => {
		// console.log(interviewer.id, props.value);
		return (
			<InterViewerListItem
				key={ interviewer.id }
				name={ interviewer.name }
				avatar={ interviewer.avatar }
				selected={ props.value === interviewer.id }
				setInterviewer={ () => props.onChange(interviewer.id) }
			/>
		);
	});

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{ list }</ul>
		</section>
	);
}
