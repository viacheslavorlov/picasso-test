import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {pageSliceReducer} from '../../features/PostList/model/slice/pageSlise';
import {baseApi} from '../../shared/api/baseApi';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    pageSlice: pageSliceReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
