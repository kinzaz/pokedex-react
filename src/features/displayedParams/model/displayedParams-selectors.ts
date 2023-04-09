import { RootState } from '@/store';

export const selectLimit = (state: RootState) => state.displayedParams.limit;
export const selectPage = (state: RootState) => state.displayedParams.page;
export const selectModal = (state: RootState) => state.displayedParams.modal;
export const selectIsDisabledButton = (state: RootState) =>
	state.displayedParams.disabledButton;
export const selectShowPagination = (state: RootState) =>
	state.displayedParams.showPagination;
