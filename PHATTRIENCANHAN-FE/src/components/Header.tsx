import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { logout, setLoading } from '../store/slices/authSlice';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, remove } from 'firebase/database';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hideDropdownTimeout, setHideDropdownTimeout] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);
  const auth = getAuth();
  const rtdb = getDatabase();

  // Xử lý sticky header khi cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'TRANG CHỦ', href: '/' },
    { name: 'DU LỊCH', href: '/tours' },
    { name: 'TIN TỨC', href: '/news' },
    { name: 'GIỚI THIỆU', href: '/about' },
    { name: 'LIÊN HỆ', href: '/contacts' },
  ];

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userStatusRef = ref(rtdb, `onlineUsers/${currentUser.uid}`);
        await remove(userStatusRef);
      }
      await signOut(auth);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      dispatch(logout());
      setIsDropdownOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMouseEnterUser = () => {
    if (hideDropdownTimeout) {
      clearTimeout(hideDropdownTimeout);
      setHideDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeaveUser = () => {
    const timeoutId = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
    setHideDropdownTimeout(timeoutId);
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors duration-300">
            <img src="/image/logo1.png" alt="BenThanhTourist Logo" className="w-32 h-12 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow">
            <div className="flex-grow flex justify-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-2 py-1 text-gray-600 text-sm font-medium uppercase transition-all duration-300 hover:text-teal-600 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-teal-600 after:transition-all after:duration-300 hover:after:w-full"
                  aria-label={`Chuyển đến ${item.name}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth/User Info */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={handleMouseEnterUser}
                onMouseLeave={handleMouseLeaveUser}
              >
                <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-teal-600 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="truncate max-w-[150px]">{user?.fullName || user?.email}</span>
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-20"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Thông tin nhân
                      </Link>
                      <Link
                        to="/change-password"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Đổi mật khẩu
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        disabled={loading}
                        aria-label="Đăng xuất"
                      >
                        {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-teal-600 border border-teal-400 rounded-lg hover:bg-teal-50 transition-colors duration-300"
                  aria-label="Chuyển đến trang đăng nhập"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                  aria-label="Chuyển đến trang đăng ký"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-teal-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden mt-4 space-y-4 bg-gray-50 p-4 rounded-xl"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Thông tin người dùng ({user?.fullName || user?.email})
                  </Link>
                  <Link
                    to="/change-password"
                    className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đổi mật khẩu
                  </Link>
                  <button
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    disabled={loading}
                    aria-label="Đăng xuất"
                  >
                    {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;