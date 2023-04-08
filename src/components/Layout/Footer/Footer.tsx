import { SocialMedia } from '../../SocialMedia';
import * as C from './styles';

export const Footer = () => {
	return (
		<div className="main-container">
			<C.Container>
				<C.Copy>
					<span>Image copyright Nintendo & The Pokémon Company</span>
					<span>Data taken from API - pokeapi.co</span>
				</C.Copy>
				<SocialMedia />
			</C.Container>
		</div>
	);
};
