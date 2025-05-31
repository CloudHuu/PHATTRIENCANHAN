import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'wishlist' | 'wallet'>('profile');

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* User Info Section - Matching Image */}
              <div className="flex flex-col items-center pb-6 border-b border-gray-200 mb-6">
                {/* Avatar with Yellow Border */}
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 border-4 border-yellow-400">
                  {/* Display first initial or a default icon */}
                  {user?.fullName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'H'} {/* Use 'H' as default if no name/email initial available */}
                </div>
                {/* Username and Shield Icon with Tooltip */}
                <div className="flex items-center mb-2"> {/* Keep flex items-center */}
                  <h2 className="text-xl font-semibold text-gray-900 mr-2">{user?.email?.split('@')[0] || 'Username'}</h2> {/* Added margin-right */}
                  {/* Shield Icon from Header with Tooltip */}
                  <div className="relative group"> {/* New relative container for shield and tooltip */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 cursor-help" fill="currentColor" viewBox="0 0 24 24"> {/* Used fill and adjusted viewBox */}
                      <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" /> {/* A common shield path */}
                    </svg>
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"> {/* Tooltip styles */}
                      Quản trị viên
                    </div>
                  </div>
                </div>
                {/* Full Name */}
                <p className="text-gray-600 mb-4">{user?.fullName || 'Họ tên'}</p>
                {/* Edit button with Pen Icon - Adjusted roundedness */}
                <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition-colors duration-300 flex items-center"> {/* Changed rounded-md to rounded-full */}
                  {/* Pen Icon (Placeholder SVG) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Chỉnh sửa
                </button>
              </div>

              {/* Giới thiệu Section - Matching Image */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-orange-500 font-semibold mb-3">Giới thiệu</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p>Giới thiệu: <span className="text-gray-500 italic">Chưa cập nhật</span></p>
                </div>
              </div>

              {/* Liên hệ Section - Matching Image */}
              <div className="mb-6">
                <h3 className="text-orange-500 font-semibold mb-3">Liên hệ</h3>
                <div className="space-y-2 text-gray-700 text-sm">
                  {/* Phone Icon - Using the simpler icon */}
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-6 w-6 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24"> {/* Updated viewBox */}
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /> {/* Simpler phone path */}
                    </svg>
                    <span className="text-gray-500 italic">{user?.phone || 'Chưa cập nhật'}</span>
                  </p>
                  {/* Email Icon - Using the simpler icon */}
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-6 w-6 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24"> {/* Updated viewBox */}
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /> {/* Simpler email paths */}
                    </svg>
                    {user?.email || 'Chưa cập nhật'}
                    {/* Verified Email Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-4 w-4 ml-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Keep the original verified icon */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </p>
                </div>
              </div>

              {/* Removed Navigation Links from Sidebar */}
              {/* They will be moved to tabs on the right */}

            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-2">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Chỉnh sửa thông tin
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Lịch sử đặt tour
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'wishlist' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Danh sách yêu thích
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'wallet' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Ví cá nhân
                </button>
              </nav>
            </div>

            {/* Tab Content - Thông tin cá nhân */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-lg p-6">

                <div className="flex justify-between items-start"> {/* Ensure items are aligned to the top */}
                  {/* Use flex-grow on the inner div to distribute space */}
                  <div className="flex space-x-8 w-full"> {/* Increased space-x and ensure full width usage */}
                    {/* Tên người dùng and Ngày sinh */}
                    <div className="flex flex-col flex-1"> {/* Use flex-1 to allow column to grow */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">* Tên người dùng</label>
                      <input type="text" value={user?.email?.split('@')[0] || ''} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed" />

                      {/* Ngày sinh */}
                      <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">* Ngày sinh</label>
                      <div className="relative">
                        <input type="text" placeholder="Chọn ngày sinh" className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-primary focus:border-primary" />
                        {/* Calendar Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Họ và tên and Giới tính */}
                    <div className="flex flex-col flex-1"> {/* Use flex-1 to allow column to grow */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                      <input type="text" value={user?.fullName || ''} className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary" />

                      {/* Giới tính */}
                      <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Giới tính</label>
                      <div className="flex items-center space-x-4 pt-2">
                        <label className="inline-flex items-center">
                          <input type="radio" name="gender" value="male" className="form-radio text-primary" checked />
                          <span className="ml-2 text-gray-700">Nam</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="radio" name="gender" value="female" className="form-radio text-primary" />
                          <span className="ml-2 text-gray-700">Nữ</span>
                        </label>
                      </div>

                      {/* Avatar Upload Area - Placed below Gender, adjusted spacing */}
                      <div className="flex flex-col items-center space-y-2 mt-5"> {/* Adjusted spacing and increased top margin slightly to move below gender */}
                        {/* Circular Upload Area */}
                        <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
                          {/* Plus Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          {/* Text */}
                          <p className="mt-1 text-sm">Tải ảnh lên</p>
                        </div>
                        {/* File type info */}
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 1MB</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Adjusted spacing for sections below the top row */}
                <div className="space-y-4 mt-[-3rem]"> {/* Adjusted vertical space and increased negative top margin to move content up slightly more */}
                  {/* Email */}
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">* Tài khoản Email</label>
                    <input type="email" value={user?.email || ''} readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed" />
                    {/* Verified label */}
                    <p className="mt-1 text-sm text-green-600">Email đã được xác thực</p>
                  </div>

                  {/* Phone Number and Save Button Row */}
                  <div className="flex items-end space-x-4">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <div className="flex space-x-2">
                        <input type="tel" value={user?.phone || ''} placeholder="Nhập số điện thoại" className="flex-grow px-2 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                        {/* Verification button */}
                        <button className="flex items-center px-3 py-1 text-xs font-semibold bg-red-200 text-red-700 rounded-full shadow hover:bg-red-300 transition-colors duration-300 whitespace-nowrap">
                          {/* Icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          <span>Xác Thực Ngay!</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Save Changes button */}
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-colors duration-300">Lưu thay đổi</button>
                </div>

              </div>
            )}

            {/* Tab Content - Lịch sử đặt tour */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Lịch sử đặt tour</h2>
                <div className="text-center text-gray-500 py-8">
                  Chưa có tour nào được đặt
                </div>
              </div>
            )}

            {/* Tab Content - Danh sách yêu thích (Placeholder) */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Danh sách yêu thích</h2>
                <p>Nội dung danh sách yêu thích sẽ được thêm tại đây.</p>
              </div>
            )}

            {/* Tab Content - Ví cá nhân (Placeholder) */}
            {activeTab === 'wallet' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Ví cá nhân</h2>
                <p>Nội dung ví cá nhân sẽ được thêm tại đây.</p>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
