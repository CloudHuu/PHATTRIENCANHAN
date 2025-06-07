import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  location: string;
  images: string[];
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  isActive?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
  views: number; // Thêm trường views
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
    // Thêm reducer tăng lượt xem
    incrementTourViews: (state, action: PayloadAction<number>) => {
      const tourId = action.payload;
      const tourItem = state.tours.find(t => t.id === tourId);
      if (tourItem) {
        tourItem.views = (tourItem.views || 0) + 1;
      }
    },
  },
});

export const { setTours, setSelectedTour, setLoading, setError, incrementTourViews } = tourSlice.actions;
export default tourSlice.reducer;