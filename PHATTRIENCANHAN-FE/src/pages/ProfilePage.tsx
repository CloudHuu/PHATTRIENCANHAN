import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUserProfile, setCredentials } from '../store/slices/authSlice';
import API_BASE_URL from '../config/api';

// Define the type for editable profile data
interface EditableProfileData {
  fullName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  avatarPreviewUrl?: string;
  avatarFile?: File;
  avatarUrl?: string;
  introduction?: string;
}

// Define the type for the data sent to the update profile API
interface UpdateProfileDto {
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  fullName?: string;
  phone?: string;
  image?: string;
  introduction?: string;
}

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'wishlist' | 'wallet'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [notification, setNotification] = useState<{ message: string | null; type: 'success' | 'error' | null }>({
    message: null,
    type: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editableData, setEditableData] = useState<EditableProfileData>({
    fullName: user?.fullName || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || undefined,
    phone: user?.phone || '',
    avatarPreviewUrl: user?.avatar || '',
    avatarFile: undefined,
    avatarUrl: user?.avatar || '',
    introduction: user?.introduction || '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setIsFetchingUser(false);
        return;
      }

      setIsFetchingUser(true);
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user data:', response.status, response.statusText);
          return;
        }

        const userData = await response.json();
        dispatch(setCredentials({ user: userData, token }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsFetchingUser(false);
      }
    };

    fetchUserData();
  }, [token, dispatch]);

  useEffect(() => {
    setEditableData(prevData => ({
      ...prevData,
      fullName: user?.fullName || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || undefined,
      phone: user?.phone || '',
      avatarPreviewUrl: user?.avatar || prevData.avatarUrl || '',
      avatarUrl: user?.avatar || prevData.avatarUrl || '',
      avatarFile: undefined,
      introduction: user?.introduction || prevData.introduction || '',
    }));
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setEditableData(prevData => ({ ...prevData, avatarFile: undefined, avatarPreviewUrl: user?.avatar || '' }));
        setNotification({
          message: 'Kích thước ảnh không được vượt quá 1MB.',
          type: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableData(prevData => ({
          ...prevData,
          avatarFile: file,
          avatarPreviewUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);

      try {
        setIsUploadingAvatar(true);
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetch(`${API_BASE_URL}/auth/upload-avatar`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Upload failed');
        }

        const data = await response.json();
        setEditableData(prevData => ({
          ...prevData,
          avatarUrl: data.avatarUrl,
        }));
      } catch (error) {
        setNotification({
          message: error instanceof Error ? error.message : 'Không thể tải ảnh lên. Vui lòng thử lại.',
          type: 'error',
        });
        setEditableData(prevData => ({
          ...prevData,
          avatarFile: undefined,
          avatarPreviewUrl: user?.avatar || '',
        }));
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEditableData(prevData => ({
        ...prevData,
        fullName: prevData.fullName || '',
        dateOfBirth: prevData.dateOfBirth || '',
        gender: prevData.gender || undefined,
        phone: prevData.phone || '',
        avatarPreviewUrl: prevData.avatarUrl || prevData.avatarPreviewUrl || '',
        avatarFile: undefined,
        avatarUrl: prevData.avatarUrl || '',
        introduction: prevData.introduction || '',
      }));

      const updatedUser = {
        ...user,
        fullName: editableData.fullName,
        dateOfBirth: editableData.dateOfBirth,
        gender: editableData.gender,
        phone: editableData.phone,
        avatar: editableData.avatarUrl,
        introduction: editableData.introduction,
      };

      dispatch(updateUserProfile(updatedUser));
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setNotification({
        message: 'Lưu Thành Công',
        type: 'success',
      });
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  if (isFetchingUser) {
    return (
      <div className="py-12 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="animate-spin h-10 w-10 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Đang tải thông tin người dùng
          </h2>
          <p className="text-sm text-gray-500">
            Vui lòng chờ giây lát...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Không thể tải thông tin người dùng hoặc người dùng chưa đăng nhập.</div>;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8 lg:items-stretch">
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
              <div className="flex flex-col items-center pb-4 border-b border-gray-200 mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 border-4 border-yellow-400 overflow-hidden">
                  {editableData.avatarPreviewUrl ? (
                    <img
                      src={editableData.avatarPreviewUrl.startsWith('data:') ? editableData.avatarPreviewUrl : `${API_BASE_URL}${editableData.avatarPreviewUrl}`}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white text-5xl font-bold">
                      {user?.fullName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'H'}
                    </div>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 mr-2">{user?.email?.split('@')[0] || 'Username'}</h2>
                  <div className="relative group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 cursor-help" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l- terribile9-4z" />
                    </svg>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Quản trị viên
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{user?.fullName || 'Họ tên'}</p>
                <button
                  onClick={handleAvatarClick}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Chỉnh sửa
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {/* Giới thiệu Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-orange-500 font-semibold mb-3">Giới thiệu</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    Giới thiệu: <span className="text-gray-500 italic">{editableData.introduction || 'Chưa cập nhật'}</span>
                  </p>
                </div>
              </div>
              {/* Liên hệ Section */}
              <div className="mb-6">
                <h3 className="text-orange-500 font-semibold mb-3">Liên hệ</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-2 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-500 italic">{user?.phone || 'Chưa cập nhật'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-6 w-6 mr-2 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{user?.email || 'Chưa cập nhật'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="border-b border-gray-200 mb-2">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Thông Tin Cá Nhân
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'wishlist' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Danh sách yêu thích
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'wallet' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ví cá nhân
                </button>
              </nav>
            </div>
            {/* Tab Content - Thông tin cá nhân */}
            <div className={`bg-white rounded-lg shadow-lg p-6 flex-grow ${activeTab !== 'profile' ? 'hidden' : ''}`}>
              <div className="flex flex-wrap -mx-4">
                {/* Left Column */}
                <div className="w-full lg:w-1/2 px-4">
                  <div className="flex flex-col space-y-4">
                    {/* Tên người dùng */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">* Tên người dùng</label>
                      <input
                        type="text"
                        value={user?.email?.split('@')[0] || ''}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    {/* Tài khoản Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">* Tài khoản Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                      <p className="mt-1 text-sm text-green-600">Email đã được xác thực</p>
                    </div>
                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <div className="flex space-x-2">
                        <input
                          type="tel"
                          value={editableData.phone || ''}
                          placeholder="Nhập số điện thoại"
                          className="flex-grow px-2 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          name="phone"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* Giới thiệu */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                      <textarea
                        value={editableData.introduction || ''}
                        onChange={e => setEditableData(prev => ({ ...prev, introduction: e.target.value }))}
                        name="introduction"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        rows={3}
                        placeholder="Giới thiệu về bản thân..."
                      />
                    </div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="w-full lg:w-1/2 px-4 mt-4 lg:mt-0">
                  <div className="flex flex-col space-y-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                      <input
                        type="text"
                        value={editableData.fullName || ''}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        name="fullName"
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Save Changes button */}
                    <div className="flex justify-end mt-4 w-full">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-colors duration-300 ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab Content - Danh sách yêu thích */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Danh sách yêu thích</h2>
                <p>Nội dung danh sách yêu thích sẽ được thêm tại đây.</p>
              </div>
            )}
            {/* Tab Content - Ví cá nhân */}
            {activeTab === 'wallet' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Ví cá nhân</h2>
                <p>Nội dung ví cá nhân sẽ được thêm tại đây.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom Notification Toast */}
      {notification.message && (
        <div
          className={`fixed top-16 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-500 transform ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } ${notification.message ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;