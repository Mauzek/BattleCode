import type { UserResponse } from '@/types/models/auth';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '@/api/user'; 

// Асинхронные thunk'и для работы с пользователем - используем готовые заглушки
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: Partial<UserResponse>, { rejectWithValue }) => {
    try {
      return await userApi.updateProfile(userData as UserResponse);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await userApi.getProfile(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface UserState {
  currentUser: UserResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<UserResponse>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserError, updateUserData } = userSlice.actions;
export default userSlice.reducer;