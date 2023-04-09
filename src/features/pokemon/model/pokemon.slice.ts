import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Pokemon } from '@/types/Pokemon';
import { Extra } from '@/types/extra';
import { Status } from '@/types/status';

export const loadPokemonByName = createAsyncThunk<
	Pokemon,
	string,
	{ extra: Extra }
>('@@pokemon/load-pokemon', async (name, { extra: { client, api } }) => {
	const res = await client.get(api.getPokemon(name));
	return res.data;
});

type PokemonSlice = {
	currentPokemon: Pokemon | null;
	status: Status;
	error: string;
};

const initialState: PokemonSlice = {
	status: 'pending',
	currentPokemon: null,
	error: '',
};

const pokemonSlice = createSlice({
	name: '@@pokemon',
	initialState,
	reducers: {
		clearPokemon: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadPokemonByName.pending, (state) => {
				state.status = 'pending';
				state.error = '';
			})
			.addCase(loadPokemonByName.rejected, (state) => {
				state.status = 'rejected';
				state.error = 'Cannot load data';
			})
			.addCase(
				loadPokemonByName.fulfilled,
				(state, action: PayloadAction<Pokemon>) => {
					state.status = 'fulfilled';
					state.currentPokemon = action.payload;
				}
			);
	},
});

export const { clearPokemon } = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
