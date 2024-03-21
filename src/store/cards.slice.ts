import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {UserCardsList} from '../interfaces/user.interface.ts';
import {RootState} from './store.ts';
import {PREFIX} from '../helpers/API.ts';

export const CARD_PERSISTENT_STATE = 'cardsData';

const initialState: UserCardsList = {
    commonCards: {
        cards: [],
        totalAmount: 0,
        userFoundAmount: 0
    },
    rareCards: {
        cards: [],
        totalAmount: 0,
        userFoundAmount: 0
    },
    epicCards: {
        cards: [],
        totalAmount: 0,
        userFoundAmount: 0
    },
    loading: false,
    error: null
};

export const fetchCardsAsync = createAsyncThunk<UserCardsList, void, { state: RootState }>('user/fetchCardsAsync',
    async (_, thunkApi) => {
        try {
            const jwt = thunkApi.getState().user.jwt;
            const profile = thunkApi.getState().user.profile;
            const userId = profile?.id;
            console.log(userId);
            const commonResponse = await axios.get(`${PREFIX}/cards/users/${userId}?rarity=COMMON`, {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            });
            const rareResponse = await axios.get(`${PREFIX}/cards/users/${userId}?rarity=RARE`, {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            });
            const epicResponse = await axios.get(`${PREFIX}/cards/users/${userId}?rarity=EPIC`, {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                }
            });
            return {
                commonCards: commonResponse.data,
                rareCards: rareResponse.data,
                epicCards: epicResponse.data,

                loading: false,
                error: null
            };
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.errorDetails);
            }
            throw new Error('Error is sent');
        }
    }
);


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCardsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCardsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.commonCards = action.payload.commonCards;
                state.rareCards = action.payload.rareCards;
                state.epicCards = action.payload.epicCards;
            })
            .addCase(fetchCardsAsync.rejected, (state, action) => {
                console.log(action.error.message)
                state.loading = false;
                state.error = action.error.message || 'Error occurred';
            });
    }
});

export default cardsSlice.reducer;
