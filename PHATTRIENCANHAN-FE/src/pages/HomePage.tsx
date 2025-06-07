import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import { newsSampleData } from '../mocks/newsSampleData';
import { toursSampleData } from '../mocks/toursSampleData';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getDatabase, ref, set, onDisconnect, onValue, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const HomePage: React.FC = () => {
  interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: string;
    images: string[];
    description: string;
    author: string;
    views: number;
  }

  interface TourItem {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    duration: string;
    views: number;
  }

  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState<string | null>(null);
  const [featuredTours, setFeaturedTours] = useState<TourItem[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [errorTours, setErrorTours] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loginCount, setLoginCount] = useState<number>(0);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const firestore = getFirestore();
  const rtdb = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const onlineRef = ref(rtdb, 'onlineUsers');
    const unsubscribeOnline = onValue(onlineRef, (snapshot) => {
      const data = snapshot.val();
      const count = data ? Object.keys(data).length : 0;
      setOnlineCount(count);
    });

    return () => unsubscribeOnline();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        const userStatusRef = ref(rtdb, `onlineUsers/${user.uid}`);
        set(userStatusRef, {
          email: user.email || '',
          displayName: user.displayName || '',
          timestamp: Date.now(),
        });
        onDisconnect(userStatusRef).remove();
      } else {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userStatusRef = ref(rtdb, `onlineUsers/${currentUser.uid}`);
          remove(userStatusRef);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      const counterRef = doc(firestore, 'counters', 'global');
      updateDoc(counterRef, { visitorCount: increment(1) });
      sessionStorage.setItem('visited', 'true');
    }

    const fetchCounts = async () => {
      const counterRef = doc(firestore, 'counters', 'global');
      const snap = await getDoc(counterRef);
      if (snap.exists()) {
        setVisitorCount(snap.data().visitorCount || 0);
        setLoginCount(snap.data().loginCount || 0);
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    setLoadingNews(true);
    setErrorNews(null);
    setTimeout(() => {
      const localNews = JSON.parse(localStorage.getItem('newsList') || '[]');
      const allNews: NewsItem[] = localNews.length ? localNews : newsSampleData;
      const sortedNews = [...allNews].sort((a, b) => b.views - a.views); // Sort by views descending
      setFeaturedNews(sortedNews.slice(0, 6)); // Get top 6 news items
      setLoadingNews(false);
    }, 300);
  }, []);

  useEffect(() => {
    setLoadingTours(true);
    setErrorTours(null);
    setTimeout(() => {
      const localTours = JSON.parse(localStorage.getItem('toursList') || '[]');
      const allTours: TourItem[] = localTours.length ? localTours : toursSampleData;
      const sortedTours = [...allTours].sort((a, b) => (b.views || 0) - (a.views || 0));
      setFeaturedTours(
        sortedTours.slice(0, 3).map(tour => ({
          ...tour,
          duration: tour.duration.toString(),
        }))
      );
      setLoadingTours(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <HeroSlider />

      {/* Statistics Section */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 mt-8">
          <div className="bg-gradient-to-r from-teal-500 to-indigo-600 rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-out animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="stat-card p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-lg animate-fade-in">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white mr-3 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-bold text-white">Tổng số lượt truy cập</h3>
                </div>
                <p className="text-3xl font-extrabold text-white animate-pulse">{visitorCount.toLocaleString()}</p>
              </div>
              <div className="stat-card p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-lg animate-fade-in delay-200">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white mr-3 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.5 2.5a1 1 0 001.414-1.414l-1.793-1.793A1 1 0 0011 10V6z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-bold text-white">Tổng số lượt đăng nhập</h3>
                </div>
                <p className="text-3xl font-extrabold text-white animate-pulse">{loginCount.toLocaleString()}</p>
              </div>
              <div className="stat-card p-4 rounded-lg bg-white bg-opacity-10 backdrop-blur-lg animate-fade-in delay-400">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-white mr-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <h3 className="text-lg font-bold text-white">Số người đang online</h3>
                </div>
                <div className="text-3xl font-extrabold text-white flex items-center justify-center animate-pulse">
                  {onlineCount}
                  {onlineCount > 0 && <span className="w-4 h-4 bg-green-400 rounded-full ml-3 animate-ping"></span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 animate-slide-up">
            Tour Du Lịch Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingTours && <div className="text-center py-6 text-gray-600 animate-pulse">Đang tải tour...</div>}
            {errorTours && <div className="text-center py-6 text-red-600 animate-pulse">Lỗi: {errorTours}</div>}
            {!loadingTours && !errorTours && featuredTours.length === 0 && (
              <div className="text-center py-6 text-gray-600 animate-pulse">Không tìm thấy tour nổi bật.</div>
            )}
            {!loadingTours && !errorTours && featuredTours.map((tour, index) => (
              <div
                key={tour.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl animate-slide-up delay-${index * 100}`}
              >
                <img
                  src={tour.images && tour.images.length > 0 ? tour.images[0] : '/default-image.jpg'}
                  alt={tour.name}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    <Link to={`/tours/${tour.id}`} className="hover:text-teal-600 transition-colors duration-300">
                      {tour.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-base line-clamp-3">{tour.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-teal-600">{tour.price?.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm text-gray-500">{tour.duration} ngày</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{tour.views || 0} lượt xem</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-green-600 animate-slide-up">
            Blog Của Chúng Tôi
          </h2>
          <p className="text-center text-lg text-gray-600 mb-8 animate-fade-in">Những bài viết được xem nhiều nhất</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingNews && <div className="text-center py-6 text-gray-600 animate-pulse">Đang tải blog...</div>}
            {errorNews && <div className="text-center py-6 text-red-600 animate-pulse">Lỗi: {errorNews}</div>}
            {!loadingNews && !errorNews && featuredNews.length === 0 && (
              <div className="text-center py-6 text-gray-600 animate-pulse">Không tìm thấy bài viết.</div>
            )}
            {!loadingNews && !errorNews && featuredNews.slice(0, 3).map((news, index) => (
              <div
                key={news.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl animate-slide-up delay-${index * 100}`}
              >
                <img
                  src={news.images && news.images.length > 0 ? news.images[0] : '/default-image.jpg'}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <span className="inline-block px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full mb-2">
                    {news.date}
                  </span>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    <Link to={`/news/${news.id}`} className="hover:text-teal-600 transition-colors duration-300">
                      {news.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{news.views} lượt xem</span>
                    <button className="text-teal-600 hover:text-teal-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!loadingNews && !errorNews && featuredNews.length > 0 && (
            <div className="text-center mt-8">
              <Link
                to="/news"
                className="inline-block px-6 py-2 bg-teal-600 text-white font-semibold rounded-full shadow-md hover:bg-teal-700 hover:scale-105 transition-all duration-300"
              >
                Xem Thêm Tin Tức
              </Link>
            </div>
          )}
        </div>
        {/* Falling leaves effect */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-brown-600 rounded-full opacity-50 animate-fall"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4 animate-slide-up">
            Sẵn Sàng Cho Chuyến Phiêu Lưu Tiếp Theo?
          </h2>
          <p className="text-xl mb-8 animate-fade-in delay-200">
            Đăng ký ngay để nhận thông tin về các tour du lịch mới nhất
          </p>
          <Link
            to="/tours"
            className="inline-block px-8 py-3 bg-white text-teal-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-pulse-slow"
          >
            Khám Phá Ngay
          </Link>
        </div>
      </section>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(${Math.random() * 20 - 10}vw);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-slide-up { animation: slide-up 0.7s ease-out; }
        .animate-fade-in { animation: fade-in 0.7s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-teal-600 { scrollbar-color: #319795 #e5e7eb; }
        .scrollbar-track-gray-200 { scrollbar-color: #319795 #e5e7eb; }
        .animate-fall {
          animation: fall linear infinite;
          position: absolute;
          z-index: 0;
        }
        .bg-brown-600 { background-color: #5C4033; }
      `}</style>
    </div>
  );
};

export default HomePage;