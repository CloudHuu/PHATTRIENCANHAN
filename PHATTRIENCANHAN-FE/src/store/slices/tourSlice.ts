import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // Số ngày
  location: string;
  images: string[]; // Mảng ảnh
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  isActive?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TourState {
  tours: Tour[];
  selectedTour: Tour | null;
  loading: boolean;
  error: string | null;
}

const initialState: TourState = {
  tours: [],
  selectedTour: null,
  loading: false,
  error: null,
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setTours: (state, action: PayloadAction<Tour[]>) => {
      state.tours = action.payload;
    },
    setSelectedTour: (state, action: PayloadAction<Tour>) => {
      state.selectedTour = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTours, setSelectedTour, setLoading, setError } = tourSlice.actions;
export default tourSlice.reducer;