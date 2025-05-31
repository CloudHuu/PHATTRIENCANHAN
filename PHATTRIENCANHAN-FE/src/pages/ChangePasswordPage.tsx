import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

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
    const errors: {[key: string]: string} = {};
    if (!formData.currentPassword) {
      errors.currentPassword = 'Mật khẩu hiện tại không được để trống.';
    }
    if (!formData.newPassword) {
      errors.newPassword = 'Mật khẩu mới không được để trống.';
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'Mật khẩu mới phải ít nhất 6 ký tự.';
    }
    if (!formData.confirmNewPassword) {
      errors.confirmNewPassword = 'Xác nhận mật khẩu mới không được để trống.';
    }
    if (formData.newPassword && formData.confirmNewPassword && formData.newPassword !== formData.confirmNewPassword) {
      errors.confirmNewPassword = 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setFormErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with your actual backend API URL for changing password
      // You will likely need to include the user's token in the Authorization header
      const token = localStorage.getItem('accessToken');
      if (!token) {
          setError('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
          setLoading(false);
          return;
      }

      const response = await fetch('http://localhost:3000/auth/change-password', { // Example API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data && typeof data === 'object' && data.message ? data.message : 'Đổi mật khẩu thất bại.';
        throw new Error(errorMessage);
      }

      console.log('Password change successful:', data);
      setSuccess('Đổi mật khẩu thành công!');
      // Optional: Redirect user after success
      // setTimeout(() => { navigate('/profile'); }, 2000);

    } catch (err: any) {
      console.error('Password change error:', err);
      setError(err.message || 'Đã xảy ra lỗi khi đổi mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đổi mật khẩu
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${formErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Mật khẩu hiện tại"
              />
              {formErrors.currentPassword && <p className="mt-1 text-red-500 text-xs">{formErrors.currentPassword}</p>}
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${formErrors.newPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Mật khẩu mới"
              />
               {formErrors.newPassword && <p className="mt-1 text-red-500 text-xs">{formErrors.newPassword}</p>}
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${formErrors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Xác nhận mật khẩu mới"
              />
               {formErrors.confirmNewPassword && <p className="mt-1 text-red-500 text-xs">{formErrors.confirmNewPassword}</p>}
            </div>
          </div>

          {loading && <p className="text-center text-blue-600 text-sm">Đang đổi mật khẩu...</p>}
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
          {success && <p className="text-center text-green-600 text-sm">{success}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage; 