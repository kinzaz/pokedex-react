import * as C from './styles';
import { ReactComponent as PokemonLogo } from '@/assets/logo-pokemon.svg';
import { SocialMedia } from '@/components/SocialMedia'; 
export const Header = () => {
	return (
		<div className="main-container">
			<C.Container>
				<PokemonLogo />
				<SocialMedia />
			</C.Container>
		</div>
	);
};
