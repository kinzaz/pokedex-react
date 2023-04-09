import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DisplayedParamsSlice = {
	limit: number;
	page: number;
	modal: boolean;
	disabledButton: boolean;
	showPagination: boolean;
};

const initialState: DisplayedParamsSlice = {
	limit: 10,
	page: 1,
	modal: false,
	disabledButton: false,
	showPagination: true,
};

const displayedParamsSlice = createSlice({
	name: '@@displayedParams',
	initialState,
	reducers: {
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setModal: (state, action: PayloadAction<boolean>) => {
			state.modal = action.payload;
		},
		setDisabledButton: (state, action: PayloadAction<boolean>) => {
			state.disabledButton = action.payload;
		},
		setPagination: (state, action: PayloadAction<boolean>) => {
			state.showPagination = action.payload;
		},
	},
});

export const { setLimit, setPage, setModal, setDisabledButton, setPagination } =
	displayedParamsSlice.actions;

export const displayedParamsReducer = displayedParamsSlice.reducer;
