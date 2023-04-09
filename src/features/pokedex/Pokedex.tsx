import { PokemonCard } from '../pokemon';
import * as C from './styles';
import { ReactComponent as UpArrowIcon } from '@/assets/icon-arrow-up.svg';
import { ErrorMessage } from '@/components/helper/ErrorMessage';
import { Loading } from '@/components/helper/Loading';
import { UsePagination } from '@/components/Pagination';
import { useSelector } from 'react-redux';
import { selectPokedex } from './model/pokedex-selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { loadPokedex } from './model/pokedex.slice';
import {
	selectLimit,
	selectPage,
	selectShowPagination,
} from '../displayedParams/model/displayedParams-selectors';

type PokedexProps = {
	searchBarRef: React.MutableRefObject<HTMLDivElement>;
};

export const Pokedex = (props: PokedexProps) => {
	const { pokedex: pokemonList, status } = useSelector(selectPokedex);
	const page = useSelector(selectPage);
	const dispatch = useAppDispatch();
	const limit = useSelector(selectLimit);
	const showPagination = useSelector(selectShowPagination);

	useEffect(() => {
		dispatch(loadPokedex({ page, limit }));
	}, [limit]);

	if (status == 'rejected') return <ErrorMessage />;
	else
		return (
			<C.Wrapper>
				<div className='main-container'>
					{status == 'pending' ? (
						<Loading />
					) : (
						<C.PokemonList>
							{pokemonList.map((pokemon) => (
								<PokemonCard key={pokemon.id} pokemon={pokemon} />
							))}
						</C.PokemonList>
					)}
					{pokemonList.length > 1 &&
						status === 'fulfilled' &&
						showPagination === true && (
							<UsePagination searchBarRef={props.searchBarRef} />
						)}
					{pokemonList.length > 1 &&
						status == 'fulfilled' &&
						showPagination === false && (
							<C.ButtonContainer>
								<button
									className='button'
									onClick={() => {
										window.scrollTo({
											top: props.searchBarRef.current.offsetTop - 56,
										});
									}}
								>
									<UpArrowIcon />
								</button>
							</C.ButtonContainer>
						)}
				</div>
			</C.Wrapper>
		);
};
