import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getDatabase, ref, set, onDisconnect } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const firestore = getFirestore();
  const rtdb = getDatabase();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Email không đúng định dạng.';
    }
    if (!formData.password) {
      errors.password = 'Mật khẩu không được để trống.';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }
    return errors;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormErrors({});
    setNotification(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      let fullName = '';
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.firstName || data.lastName) {
          fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
        } else if (data.fullName) {
          fullName = data.fullName;
        } else {
          fullName = user.displayName || '';
        }
      } else {
        fullName = user.displayName || '';
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        fullName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber,
      };

      const token = await user.getIdToken();
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', token);
      dispatch(setCredentials({ user: userData, token }));

      const counterRef = doc(firestore, 'counters', 'global');
      await updateDoc(counterRef, { loginCount: increment(1) });

      const userStatusRef = ref(rtdb, `onlineUsers/${user.uid}`);
      set(userStatusRef, {
        email: user.email || '',
        displayName: user.displayName || '',
        timestamp: Date.now(),
      });
      onDisconnect(userStatusRef).remove();

      setNotification({ type: 'success', message: 'Đăng nhập thành công!' });
      setTimeout(() => setNotification(null), 3000);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage =
        err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'
          ? 'Email hoặc mật khẩu không đúng.'
          : err.message || 'Đã xảy ra lỗi khi đăng nhập.';
      setError(errorMessage);
      setNotification({ type: 'error', message: errorMessage });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setNotification(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      let fullName = '';
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.firstName || data.lastName) {
          fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
        } else if (data.fullName) {
          fullName = data.fullName;
        } else {
          fullName = user.displayName || '';
        }
      } else {
        fullName = user.displayName || '';
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        fullName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber,
      };

      const token = await user.getIdToken();
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', token);
      dispatch(setCredentials({ user: userData, token }));

      const counterRef = doc(firestore, 'counters', 'global');
      await updateDoc(counterRef, { loginCount: increment(1) });

      const userStatusRef = ref(rtdb, `onlineUsers/${user.uid}`);
      set(userStatusRef, {
        email: user.email || '',
        displayName: user.displayName || '',
        timestamp: Date.now(),
      });
      onDisconnect(userStatusRef).remove();

      setNotification({ type: 'success', message: 'Đăng nhập với Google thành công!' });
      setTimeout(() => setNotification(null), 3000);
      navigate('/');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập với Google.');
      setNotification({ type: 'error', message: err.message || 'Đã xảy ra lỗi khi đăng nhập với Google.' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError(null);
    setNotification(null);

    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('public_profile');
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      let fullName = '';
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.firstName || data.lastName) {
          fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
        } else if (data.fullName) {
          fullName = data.fullName;
        } else {
          fullName = user.displayName || '';
        }
      } else {
        fullName = user.displayName || '';
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        fullName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber,
      };

      const token = await user.getIdToken();
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', token);
      dispatch(setCredentials({ user: userData, token }));

      const counterRef = doc(firestore, 'counters', 'global');
      await updateDoc(counterRef, { loginCount: increment(1) });

      const userStatusRef = ref(rtdb, `onlineUsers/${user.uid}`);
      set(userStatusRef, {
        email: user.email || '',
        displayName: user.displayName || '',
        timestamp: Date.now(),
      });
      onDisconnect(userStatusRef).remove();

      setNotification({ type: 'success', message: 'Đăng nhập với Facebook thành công!' });
      setTimeout(() => setNotification(null), 3000);
      navigate('/');
    } catch (err: any) {
      console.error('Facebook sign-in error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập với Facebook.');
      setNotification({ type: 'error', message: err.message || 'Đã xảy ra lỗi khi đăng nhập với Facebook.' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-3xl border border-blue-100/50 transform transition-all duration-500 ease-in-out hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-800 drop-shadow-sm">
            Đăng nhập vào tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`appearance-none rounded-xl relative block w-full px-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all duration-300 ease-in-out`}
                placeholder="Nhập email"
              />
              {formErrors.email && <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`appearance-none rounded-xl relative block w-full px-4 py-3 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all duration-300 ease-in-out`}
                placeholder="Nhập mật khẩu"
              />
              {formErrors.password && <p className="mt-1 text-red-500 text-xs">{formErrors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-600 border-gray-300 rounded transition-colors duration-300 ease-in-out"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forget-password"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {loading && <p className="text-center text-blue-600 text-sm animate-pulse">Đang đăng nhập...</p>}
          {error && <p className="text-center text-red-500 text-sm animate-fade-in">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">Hoặc đăng nhập với:</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={loading}
              className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <AnimatePresence>
          {notification && (
            <motion.div
              variants={notificationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed top-4 right-4 w-80 p-4 rounded-lg shadow-lg text-white ${
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
              onClick={() => setNotification(null)}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center">
                {notification.type === 'success' ? (
                  <FaCheckCircle className="w-6 h-6 mr-2" />
                ) : (
                  <FaExclamationCircle className="w-6 h-6 mr-2" />
                )}
                <span>{notification.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;

const notificationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
};