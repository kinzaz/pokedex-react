import * as C from './styles';
import { SyntheticEvent } from 'react';
import { Slide } from '../Slide';
import { PokemonType } from '../PokemonType';
import { pokemonTypes } from '@/types/pokemonTypes';
import { useAppDispatch } from '@/store';
import { loadPokedexByType } from '@/features/pokedex/model/pokedex.slice';
import { setPagination } from '@/features/displayedParams/model/displayedParams.slice';

export const SearchFilter = () => {
	const dispatch = useAppDispatch();

	const handleClick = (e: SyntheticEvent) => {
		const typeName = (e.currentTarget as HTMLButtonElement).value;
		dispatch(loadPokedexByType(typeName));
		dispatch(setPagination(false));
	};

	return (
		<C.Container>
			<C.Title>Search by types</C.Title>
			<Slide>
				{pokemonTypes.map(({ name }) => (
					<PokemonType
						key={name}
						type={name}
						tabIndex={true}
						handleClick={handleClick}
					/>
				))}
			</Slide>
		</C.Container>
	);
};
