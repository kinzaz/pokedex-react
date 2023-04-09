import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 5px;
`;

export const Select = styled.select`
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: 0.4em 1.1em 0.3em 0.8em;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
	border-radius: 0.5em;
	background-color: #c9d6df;
	&::-ms-expand {
		display: none;
	}
	&:focus {
		border-color: #aaa;
		box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
		box-shadow: 0 0 0 3px -moz-mac-focusring;
		color: #222;
		outline: none;
	}
`;
