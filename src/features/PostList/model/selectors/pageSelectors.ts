import {RootState} from '../../../../app/store';

export const pageSelector = (state: RootState) => state.pageSlice.page;
