import { useEffect, useRef } from 'react';
import { Pokedex } from '@/features/pokedex';
import { SearchBar } from '@/components/SearchBar';
import { Footer } from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';
import { PokemonModal } from '@/components/PokemonModal';
import { SelectLimit } from '@/features/displayedParams/SelectLimit';
import { selectModal } from '@/features/displayedParams/model/displayedParams-selectors';
import { useSelector } from 'react-redux';

const App = () => {
	const searchBarRef = useRef<HTMLDivElement>(null);
	const modal = useSelector(selectModal);

	useEffect(() => {
		const html = document.documentElement;

		modal
			? (html.style.overflow = 'hidden')
			: (html.style.overflow = 'initial');
	}, [modal]);

	return (
		<>
			<Header />
			<SearchBar searchBarRef={searchBarRef} />
			<SelectLimit />
			<Pokedex searchBarRef={searchBarRef} />
			<Footer />
			{modal && <PokemonModal />}
		</>
	);
};

export default App;
