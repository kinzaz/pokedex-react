import * as C from './styles';
import { useAppDispatch } from '@/store';
import { setLimit } from '../model/displayedParams.slice';

export const SelectLimit = (): JSX.Element => {
	const dispatch = useAppDispatch();

	return (
		<div className='main-container'>
			<C.Container>
				<p>Display</p>
				<C.Select onChange={(e) => dispatch(setLimit(+e.target.value))}>
					<option value='10'>10</option>
					<option value='20'>20</option>
					<option value='50'>50</option>
				</C.Select>
			</C.Container>
		</div>
	);
};
