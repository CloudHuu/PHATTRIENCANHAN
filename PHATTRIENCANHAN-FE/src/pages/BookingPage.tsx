import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    specialRequests: '',
  });

  // Mock data - In real app, this would come from an API
  const tour = {
    id: id,
    title: 'Tour du lịch Đà Nẵng - Hội An',
    price: 2500000,
    duration: '3 ngày 2 đêm',
    image: 'https://via.placeholder.com/400x250',
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const calculateTotal = () => {
    const { numberOfAdults, numberOfChildren, numberOfInfants } = formData;
    const adultPrice = tour.price;
    const childPrice = tour.price * 0.7; // 70% giá người lớn
    const infantPrice = tour.price * 0.3; // 30% giá người lớn

    return (
      adultPrice * numberOfAdults +
      childPrice * numberOfChildren +
      infantPrice * numberOfInfants
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would send data to an API
    console.log('Booking data:', formData);
    alert('Đặt tour thành công!');
    navigate('/tours');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Đặt tour
          </h1>
          <p className="text-gray-600 text-lg">Vui lòng điền thông tin để hoàn tất đặt tour</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 border border-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Personal Information */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white/50 rounded-2xl p-6 shadow-inner"
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 flex items-center">
                      <span className="mr-2">👤</span>
                      Thông tin cá nhân
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Number of Travelers */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/50 rounded-2xl p-6 shadow-inner"
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 flex items-center">
                      <span className="mr-2">👥</span>
                      Số lượng khách
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="numberOfAdults"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Người lớn *
                        </label>
                        <input
                          type="number"
                          id="numberOfAdults"
                          name="numberOfAdults"
                          required
                          min="1"
                          value={formData.numberOfAdults}
                          onChange={handleNumberChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="numberOfChildren"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Trẻ em (2-11 tuổi)
                        </label>
                        <input
                          type="number"
                          id="numberOfChildren"
                          name="numberOfChildren"
                          min="0"
                          value={formData.numberOfChildren}
                          onChange={handleNumberChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="transform transition-all duration-300"
                      >
                        <label
                          htmlFor="numberOfInfants"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Em bé (dưới 2 tuổi)
                        </label>
                        <input
                          type="number"
                          id="numberOfInfants"
                          name="numberOfInfants"
                          min="0"
                          value={formData.numberOfInfants}
                          onChange={handleNumberChange}
                          className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Special Requests */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white/50 rounded-2xl p-6 shadow-inner"
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 flex items-center">
                      <span className="mr-2">✨</span>
                      Yêu cầu đặc biệt
                    </h2>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                      placeholder="Nhập yêu cầu đặc biệt của bạn (nếu có)"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  >
                    Xác nhận đặt tour
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Booking Summary */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 border border-gray-100 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center">
                <span className="mr-2">📋</span>
                Thông tin đặt tour
              </h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-4 p-4 bg-white/50 rounded-xl shadow-inner"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={tour.image}
                    alt={tour.title}
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{tour.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {tour.duration}
                    </p>
                  </div>
                </motion.div>

                <div className="border-t pt-4 border-gray-200">
                  <AnimatePresence>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-between mb-3"
                    >
                      <span className="text-gray-700">Người lớn</span>
                      <span className="text-gray-900 font-medium">
                        {formData.numberOfAdults} x {tour.price.toLocaleString()}đ
                      </span>
                    </motion.div>
                    {formData.numberOfChildren > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-between mb-3"
                      >
                        <span className="text-gray-700">Trẻ em</span>
                        <span className="text-gray-900 font-medium">
                          {formData.numberOfChildren} x {(tour.price * 0.7).toLocaleString()}đ
                        </span>
                      </motion.div>
                    )}
                    {formData.numberOfInfants > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-between mb-3"
                      >
                        <span className="text-gray-700">Em bé</span>
                        <span className="text-gray-900 font-medium">
                          {formData.numberOfInfants} x {(tour.price * 0.3).toLocaleString()}đ
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="border-t pt-4 mt-4 border-gray-200"
                  >
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        {calculateTotal().toLocaleString()}đ
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage; 