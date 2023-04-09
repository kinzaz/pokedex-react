import * as api from './config';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { pokedexReducer } from '@/features/pokedex/model/pokedex.slice';
import { pokemonReducer } from '@/features/pokemon/model/pokemon.slice';
import { displayedParamsReducer } from '@/features/displayedParams/model/displayedParams.slice';

export const store = configureStore({
	reducer: {
		displayedParams: displayedParamsReducer,
		pokedex: pokedexReducer,
		pokemon: pokemonReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					client: axios,
					api,
				},
			},
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
