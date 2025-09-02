import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../api/apiService';
import { jwtDecode } from 'jwt-decode';

const getUserFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        // This is the one-line fix.
        // We are now correctly reading the first string from the "authorities" array.
        // It was: decoded.authorities[0]?.authority
        // It is now: decoded.authorities[0]
        const role = decoded.authorities && decoded.authorities[0];

        if (decoded.exp * 1000 > Date.now() && role) {
            return { email: decoded.sub, role: role };
        }
    } catch (error) {
        console.error("Invalid token:", error);
    }
    return null;
};

const getInitialState = () => {
    const token = localStorage.getItem('token');
    const user = token ? getUserFromToken(token) : null;

    return {
        token: user ? token : null,
        user: user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
    };
};

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await apiService.post('/auth/signup', userData);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await apiService.post('/auth/login', userData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        const user = getUserFromToken(token);
        return { token, user };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Invalid credentials');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        const handleAuthFulfilled = (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
        };
        const handleAuthPending = (state) => {
            state.isLoading = true;
            state.error = null;
        };
        const handleAuthRejected = (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        };

        builder
            .addCase(register.pending, handleAuthPending)
            .addCase(register.fulfilled, (state, action) => {
                 state.isLoading = false;
                 state.token = action.payload.token;
                 state.user = getUserFromToken(action.payload.token);
                 state.isAuthenticated = true;
                 state.error = null;
            })
            .addCase(register.rejected, handleAuthRejected)
            .addCase(login.pending, handleAuthPending)
            .addCase(login.fulfilled, handleAuthFulfilled)
            .addCase(login.rejected, handleAuthRejected);
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;