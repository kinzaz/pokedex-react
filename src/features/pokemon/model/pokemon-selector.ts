import { RootState } from '@/store';

export const selectCurrentPokemon = (state: RootState) => ({
	currentPokemon: state.pokemon.currentPokemon,
	status: state.pokemon.status,
	error: state.pokemon.error,
});
