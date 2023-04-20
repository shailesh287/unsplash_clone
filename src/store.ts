import { configureStore,ThunkAction, Action } from '@reduxjs/toolkit';
import photoReducer from './Photo/photoSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    photo: photoReducer,
  },
});

export default store;