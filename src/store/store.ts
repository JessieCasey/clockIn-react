import {configureStore} from '@reduxjs/toolkit';
import userSlice, {JWT_PERSISTENT_STATE, PROFILE_PERSISTENT_STATE} from './user.slice';
import {saveState} from './storage';
import cardsSlice, {CARD_PERSISTENT_STATE} from './cards.slice.ts';

export const store = configureStore({
    reducer: {
        user: userSlice,
        cards: cardsSlice
    }
});

store.subscribe(() => {
    saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
    saveState(store.getState().user.profile, PROFILE_PERSISTENT_STATE);
    saveState({cards: store.getState().cards}, CARD_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;