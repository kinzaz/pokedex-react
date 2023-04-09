import { PokemonType } from '@/components/PokemonType';
import * as C from './styles';
import { ReactComponent as WeightIcon } from '@/assets/icon-weight.svg';
import { ReactComponent as RulerIcon } from '@/assets/icon-ruler.svg';
import { ReactComponent as BoltIcon } from '@/assets/icon-bolt.svg';
import { Pokemon } from '@/types/Pokemon';
import { pokemonTypes } from '@/types/pokemonTypes';
import { SkeletonLoading } from '@/components/helper/SkeletonLoading';
import { useAppDispatch } from '@/store';
import { loadPokemonByName } from './model/pokemon.slice';
import { setModal } from '../displayedParams/model/displayedParams.slice';

type PokemonCardProps = {
	pokemon: Pokemon;
};

export const PokemonCard = (props: PokemonCardProps) => {
	const dispatch = useAppDispatch();

	const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.pokemon.id}.png`;

	const [{ color }] = pokemonTypes.filter(
		(type) => props.pokemon.types[0].type.name.indexOf(type.name) !== -1
	);

	const handleClick = () => {
		dispatch(loadPokemonByName(props.pokemon.name));
		dispatch(setModal(true));
	};

	const formatPokemonId = (id: number) => {
		if (id < 10) return `#00${id}`;
		else if (id >= 10 && id < 99) return `#0${id}`;
		else return `#${id}`;
	};

	return (
		<C.Container>
			<C.CardOverlay color={color} />
			<C.PokemonImg>
				<SkeletonLoading src={imgUrl} alt={props.pokemon.name} />
			</C.PokemonImg>
			<C.PokemonNumber>{formatPokemonId(props.pokemon.id)}</C.PokemonNumber>
			<C.PokemonName>{props.pokemon.name}</C.PokemonName>
			<C.PokemonType>
				{props.pokemon.types.map(({ type }) => (
					<PokemonType key={type.name} type={type.name} tabIndex={false} />
				))}
			</C.PokemonType>
			<C.PokemonFeatures>
				<C.PokemonWeight>
					<div>
						<WeightIcon />
						<span>{`${props.pokemon.weight / 10}`} kg</span>
					</div>
					<span>Weight</span>
				</C.PokemonWeight>
				<C.PokemonHeight>
					<div>
						<RulerIcon />
						<span>{`${props.pokemon.height / 10}`} m</span>
					</div>
					<span>Height</span>
				</C.PokemonHeight>
			</C.PokemonFeatures>
			<C.MoreDetailsButton color={color} onClick={handleClick}>
				<BoltIcon />
				More details
			</C.MoreDetailsButton>
		</C.Container>
	);
};
