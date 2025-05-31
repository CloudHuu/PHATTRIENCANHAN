import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';

// Layouts
import MainLayout from './layouts/MainLayout';

// Components
import AuthInitializer from './components/AuthInitializer';

// Pages
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ChangePasswordPage from './pages/ChangePasswordPage';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="news/:id" element={<NewsDetailPage />} />
              <Route path="tours" element={<ToursPage />} />
              <Route path="tours/:id" element={<TourDetailPage />} />
              <Route path={"about"} element={<AboutPage/>} />
              <Route path={"contacts"} element={<ContactPage/>} />
              <Route path="booking/:tourId" element={<BookingPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
