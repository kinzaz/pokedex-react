const BASE_URL = 'https://pokeapi.co/api/v2';

export const getAllPokemons = (page: number, limit: number) => {
	const offset = limit * (page - 1);
	return BASE_URL + `/pokemon?offset=${offset}&limit=${limit}`;
};

export const getPokemon = (pokemon: string) => BASE_URL + `/pokemon/${pokemon}`;

export const getPokemonByType = (type: string) => BASE_URL + `/type/${type}`;
