import * as C from './styles';
import { ReactComponent as HomeIcon } from '@/assets/icon-home.svg';
import { loadPokedex } from '@/features/pokedex/model/pokedex.slice';
import { useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import {
	selectIsDisabledButton,
	selectLimit,
} from '@/features/displayedParams/model/displayedParams-selectors';
import {
	setDisabledButton,
	setPage,
	setPagination,
} from '@/features/displayedParams/model/displayedParams.slice';

export const HomeButton = () => {
	const limit = useSelector(selectLimit);
	const disabledButton = useSelector(selectIsDisabledButton);
	const dispatch = useAppDispatch();
	const handleClick = async () => {
		dispatch(setDisabledButton(true));
		await dispatch(loadPokedex({ page: 1, limit }));
		dispatch(setDisabledButton(false));
		dispatch(setPage(1));
		dispatch(setPagination(true));
	};

	return (
		<C.HomeButton
			className='button'
			onClick={handleClick}
			disabled={disabledButton ? true : false}
		>
			<HomeIcon />
			Restart
		</C.HomeButton>
	);
};
