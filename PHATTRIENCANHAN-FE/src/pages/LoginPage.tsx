import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
    }
    return errors;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormErrors({});

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

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: userDoc.exists() ? `${userDoc.data().firstName} ${userDoc.data().lastName}` : user.displayName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber
      };

      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setCredentials({ user: userData, token: await user.getIdToken() }));
      alert('Đăng nhập thành công!');
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'
          ? 'Email hoặc mật khẩu không đúng.'
          : err.message || 'Đã xảy ra lỗi khi đăng nhập.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: userDoc.exists() ? `${userDoc.data().firstName} ${userDoc.data().lastName}` : user.displayName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber
      };

      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setCredentials({ user: userData, token: await user.getIdToken() }));
      alert('Đăng nhập với Google thành công!');
      navigate('/');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập với Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: userDoc.exists() ? `${userDoc.data().firstName} ${userDoc.data().lastName}` : user.displayName,
        phone: userDoc.exists() ? userDoc.data().phone : user.phoneNumber
      };

      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setCredentials({ user: userData, token: await user.getIdToken() }));
      alert('Đăng nhập với Facebook thành công!');
      navigate('/');
    } catch (err: any) {
      console.error('Facebook sign-in error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập với Facebook.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-10 bg-white p-12 rounded-3xl shadow-3xl transform transition-all duration-500 ease-in-out hover:scale-105 border border-blue-100">
          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-800 drop-shadow-sm">
              Đăng nhập vào tài khoản
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Hoặc{' '}
              <Link
                  to="/register"
                  className="font-medium text-primary hover:text-primary-dark transition-colors duration-300"
              >
                đăng ký tài khoản mới
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`appearance-none rounded-xl relative block w-full px-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all duration-300 ease-in-out`}
                    placeholder="Email"
                />
                {formErrors.email && <p className="mt-1 text-red-500 text-xs">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mật khẩu
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`appearance-none rounded-xl relative block w-full px-4 py-3 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all duration-300 ease-in-out`}
                    placeholder="Mật khẩu"
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
                <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link
                    to="/forgot-password"
                    className="font-medium text-primary hover:text-primary-dark transition-colors duration-300"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {loading && <p className="text-center text-blue-600 text-sm">Đang đăng nhập...</p>}
            {error && <p className="text-center text-red-500 text-sm">{error}</p>}

            <div>
              <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 ease-in-out transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Đăng nhập với Google</span>
              <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
            </button>

            <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 ease-in-out transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Đăng nhập với Facebook</span>
              <svg
                  className="w-5 h-5"
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
            </button>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;