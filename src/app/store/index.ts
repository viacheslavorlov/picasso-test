import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {baseApi} from '@/shared/api/baseApi';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
