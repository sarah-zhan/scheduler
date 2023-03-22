import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
	const newDays = props.days.map(day => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === day.day}
				setDay={props.setDay}
			/>
		);
	});

	return <ul>{newDays}</ul>;
}