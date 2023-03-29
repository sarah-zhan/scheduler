import React from 'react';
import './InterviewerList.scss';
import InterViewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

	const list = props.interviewers.map(interviewer => {

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

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired
};
