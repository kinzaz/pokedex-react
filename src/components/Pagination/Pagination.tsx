import * as C from './styles';
import usePagination from '@mui/material/usePagination';
import { ReactComponent as LeftArrowIcon } from '@/assets/icon-arrow-left.svg';
import { ReactComponent as RightArrowIcon } from '@/assets/icon-arrow-right.svg';
import { useAppDispatch } from '@/store';
import { loadPokedex } from '@/features/pokedex/model/pokedex.slice';
import { useSelector } from 'react-redux';
import {
	selectLimit,
	selectPage,
} from '@/features/displayedParams/model/displayedParams-selectors';
import { setPage } from '@/features/displayedParams/model/displayedParams.slice';

type UsePaginationProps = {
	searchBarRef: React.MutableRefObject<HTMLDivElement>;
};

export function UsePagination(props: UsePaginationProps) {
	const dispatch = useAppDispatch();
	const limit = useSelector(selectLimit);
	const page = useSelector(selectPage);

	const handleChange = async (e: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value));
		await dispatch(loadPokedex({ page: value, limit }));

		window.scrollTo({
			top: props.searchBarRef.current.offsetTop - 56,
		});
	};

	const { items } = usePagination({
		count: 10,
		siblingCount: 0,
		page: page,
		onChange: handleChange,
	});

	return (
		<nav>
			<C.Pagination>
				{items.map(({ page, type, selected, ...item }, index) => {
					let children = null;

					if (type === 'start-ellipsis' || type === 'end-ellipsis') {
						children = <C.Ellipsis>...</C.Ellipsis>;
					} else if (type === 'page') {
						children = (
							<C.Button {...item} selected={selected}>
								{page}
							</C.Button>
						);
					} else {
						children = (
							<C.Button {...item} navigation>
								{type === 'previous' ? <LeftArrowIcon /> : <RightArrowIcon />}
							</C.Button>
						);
					}

					return <li key={index}>{children}</li>;
				})}
			</C.Pagination>
		</nav>
	);
}
