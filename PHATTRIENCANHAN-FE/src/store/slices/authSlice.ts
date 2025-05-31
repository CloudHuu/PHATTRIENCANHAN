import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  phone?: string | null;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = {
        id: action.payload.user.id,
        email: action.payload.user.email,
        name: action.payload.user.name,
        fullName: action.payload.user.fullName,
        phone: action.payload.user.phone,
        avatar: action.payload.user.avatar,
        dateOfBirth: action.payload.user.dateOfBirth,
        gender: action.payload.user.gender,
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, setLoading, updateUserProfile } = authSlice.actions;
export default authSlice.reducer; 