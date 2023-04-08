import * as C from './styles';
import { ReactComponent as GithubLogo } from '../../assets/logo-github.svg';
import { ReactComponent as TelegramLogo } from '../../assets/logo-telegram.svg';

export const SocialMedia = () => {
	return (
		<C.Container>
			<li>
				<C.Link href="https://github.com/kinzaz">
					<GithubLogo />
				</C.Link>
			</li>
			<li>
				<C.Link href="https://t.me/vv_579">
					<TelegramLogo />
				</C.Link>
			</li>
		</C.Container>
	);
};
