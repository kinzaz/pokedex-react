import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '@/types/Pokemon';
import { Extra } from '@/types/extra';
import { Status } from '@/types/status';

export const loadPokedex = createAsyncThunk<
	Pokemon[],
	{
		limit: number;
		page: number;
	},
	{ extra: Extra; rejectValue: string }
>(
	'@@pokedex/load-pokedex',
	async ({ page, limit }, { extra: { client, api }, rejectWithValue }) => {
		try {
			const pokedoxRes = await client.get(api.getAllPokemons(page, limit));

			const data = pokedoxRes.data.results;

			const promises = data.map(async (pokemon: { name: string }) => {
				const res = await client.get(api.getPokemon(pokemon.name));
				return res.data;
			});

			const pokemonList: Pokemon[] = await Promise.all(promises);

			return pokemonList;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	}
);

export const loadPokedexByType = createAsyncThunk<
	Pokemon[],
	string,
	{ state: { pokedex: PokedexSlice }; extra: Extra; rejectValue: string }
>(
	'@@pokedex/load-pokedex-by-type',
	async (typeName, { extra: { client, api }, rejectWithValue }) => {
		try {
			const pokedoxRes = await client.get(api.getPokemonByType(typeName));

			const promises = pokedoxRes.data.pokemon
				.filter((item, index: number) => index + 1 <= 10 && item)
				.map(async (item) => {
					const res = await client.get(api.getPokemon(item.pokemon.name));
					return res.data;
				});
			const pokemonList: Pokemon[] = await Promise.all(promises);
			return pokemonList;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	}
);

export const loadPokedexByName = createAsyncThunk<
	Pokemon,
	string,
	{ state: { pokedex: PokedexSlice }; extra: Extra; rejectValue: string }
>(
	'@@pokedex/load-pokedex-by-name',
	async (name, { extra: { client, api }, rejectWithValue }) => {
		try {
			const res = await client.get(api.getPokemon(name));
			return res.data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	}
);

type PokedexSlice = {
	status: Status;
	pokedex: Pokemon[];
	error: string | null;
};

const initialState: PokedexSlice = {
	status: 'pending',
	pokedex: [],
	error: null,
};

const pokedexSlice = createSlice({
	name: '@@pokedex',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadPokedex.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadPokedex.rejected, (state, action) => {
				state.error = action.payload || 'Cannot load data';
				state.status = 'rejected';
			})
			.addCase(
				loadPokedex.fulfilled,
				(state, action: PayloadAction<Pokemon[]>) => {
					state.status = 'fulfilled';
					state.pokedex = action.payload;
				}
			)
			.addCase(loadPokedexByType.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadPokedexByType.rejected, (state, action) => {
				state.error = action.payload || 'Cannot load data';
				state.status = 'rejected';
			})
			.addCase(
				loadPokedexByType.fulfilled,
				(state, action: PayloadAction<Pokemon[]>) => {
					state.status = 'fulfilled';
					state.pokedex = action.payload;
				}
			)
			.addCase(loadPokedexByName.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadPokedexByName.rejected, (state, action) => {
				state.error = action.payload || 'Cannot load data';
				state.status = 'rejected';
			})
			.addCase(
				loadPokedexByName.fulfilled,
				(state, action: PayloadAction<Pokemon>) => {
					state.status = 'fulfilled';
					console.log(action.payload);
					state.pokedex = [action.payload];
				}
			);
	},
});

export const pokedexReducer = pokedexSlice.reducer;
