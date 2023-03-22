import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function InterViewerListItem(props) {
	// console.log('props: ', props);
	const { id, name, avatar, selected } = props;
	const interviewersClass = classNames('interviewers__item', {
		'interviewers__item--selected': selected,
	});

	return (
		<li onClick={props.setInterviewer} className={interviewersClass} key={id}>
			<img className='interviewers__item-image' src={avatar} alt={name} />
			{selected && name}
		</li>
	);
}
