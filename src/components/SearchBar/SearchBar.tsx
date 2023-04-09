import * as C from './styles';
import { SearchFilter } from '../SearchFilter';
import { SearchField } from '../SearchField';
import { HomeButton } from '../HomeButton';

type SearchBarProps = {
	searchBarRef: React.MutableRefObject<HTMLDivElement>;
};

export const SearchBar = (props: SearchBarProps) => {
	return (
		<div className='main-container' ref={props.searchBarRef}>
			<C.Container>
				<HomeButton />
				<SearchFilter />
				<SearchField />
			</C.Container>
		</div>
	);
};
