import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {
	const listClass = classNames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': props.spots === 0,
	});
	return (
		<li onClick={() => props.setDay(props.name)} className={listClass}>
			<h2 className='text--regular'>{props.name}</h2>
			{/* 0 spots */}
			{props.spots === 0 && <h3 className='text--light'>no spots remaining</h3>}
			{/* 1 spot */}
			{props.spots === 1 && (
				<h3 className='text--light'>{props.spots} spot remaining</h3>
			)}
			{props.spots > 1 && (
				<h3 className='text--light'>{props.spots} spots remaining</h3>
			)}
		</li>
	);
}
