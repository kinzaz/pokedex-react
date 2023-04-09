import * as C from './styles';
import { ReactComponent as SearchIcon } from '@/assets/icon-search.svg';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '@/store';
import { loadPokedexByName } from '@/features/pokedex/model/pokedex.slice';

export const SearchField = () => {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(loadPokedexByName(inputValue.toLowerCase()));
		setInputValue('');
	};

	return (
		<C.Container onSubmit={handleSubmit}>
			<C.InputText
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder='Search Pokémon'
				required
			/>
			<C.SearchButton>
				<SearchIcon />
			</C.SearchButton>
		</C.Container>
	);
};
