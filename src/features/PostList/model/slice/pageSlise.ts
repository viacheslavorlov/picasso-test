import {createSlice} from '@reduxjs/toolkit';

const initialState: { page: number } = {
    page: 1,
};

export const pageSliceSlice = createSlice({
    name: 'pageSlice',
    initialState,
    reducers: {
        increasePage: (state) => {
            state.page = state.page + 1;
        }
    },
});

export const {reducer: pageSliceReducer, actions: pageLiseActions} = pageSliceSlice;
