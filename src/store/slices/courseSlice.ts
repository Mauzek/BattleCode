import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coursesApi } from '@/api/courses';
import type { Course } from '@/types';

interface CourseState {
  currentCourse: Course | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CourseState = {
  currentCourse: null,
  status: 'idle',
  error: null,
};


export const fetchCourse = createAsyncThunk<
  Course,
  number, 
  { rejectValue: string }
>(
  'course/fetchCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await coursesApi.getCourse(courseId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch course');
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;