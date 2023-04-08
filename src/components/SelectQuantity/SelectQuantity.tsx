import { useEffect, useState } from 'react';
import * as C from './styles';

export const SelectQuantity = ({
	handleValue,
}: {
	handleValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}): JSX.Element => {
	return (
		<div className='main-container'>
			<C.Container>
				<p>Display</p>
				<C.Select onChange={(e) => handleValue(e)}>
					<option value='10'>10</option>
					<option value='20'>20</option>
					<option value='50'>50</option>
				</C.Select>
			</C.Container>
		</div>
	);
};
