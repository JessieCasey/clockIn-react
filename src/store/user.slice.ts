import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadState} from './storage';
import {LoginResponse} from '../interfaces/auth.interface';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    registerErrorMessage?: string;
    linkSent?: boolean;
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const confirmLogin = createAsyncThunk('user/login-confirm',
    async (params: { email: string, token: string }) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login/confirm?email=${params.email}&token=${params.token}`, {
                email: params.email,
                token: params.token
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);


export const login = createAsyncThunk('user/login',
    async (params: { email: string }) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login?email=${params.email}`);
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const register = createAsyncThunk('user/register',
    async (params: { username: string, email: string }) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                username: params.username
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(confirmLogin.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(confirmLogin.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.linkSent = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.linkSent = false;
            state.registerErrorMessage = action.error.message;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload) {
                return;
            }
            state.linkSent = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.linkSent = false;
            state.registerErrorMessage = action.error.message;
        });
    }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;