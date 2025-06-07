import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  views: number;
}

interface NewsState {
  news: News[];
  selectedNews: News | null;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  selectedNews: null,
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload;
    },
    setSelectedNews: (state, action: PayloadAction<News>) => {
      state.selectedNews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Thêm reducer tăng lượt xem
    incrementNewsViews: (state, action: PayloadAction<string>) => {
      const newsId = action.payload;
      const newsItem = state.news.find(n => n.id === newsId);
      if (newsItem) {
        newsItem.views += 1;
      }
    },
  },
});

export const { setNews, setSelectedNews, setLoading, setError, incrementNewsViews } = newsSlice.actions;
export default newsSlice.reducer;