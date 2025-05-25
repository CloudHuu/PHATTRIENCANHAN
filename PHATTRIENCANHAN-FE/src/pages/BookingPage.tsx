import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Đặt tour</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      Thông tin cá nhân
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Travelers */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      Số lượng khách
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="numberOfAdults"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="numberOfChildren"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="numberOfInfants"
                          className="block text-sm font-medium text-gray-700 mb-1"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Yêu cầu đặc biệt</h2>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                      placeholder="Nhập yêu cầu đặc biệt của bạn (nếu có)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary py-3 text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Xác nhận đặt tour
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Thông tin đặt tour</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{tour.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {tour.duration}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Người lớn</span>
                    <span className="text-gray-900">
                      {formData.numberOfAdults} x\n                      {tour.price.toLocaleString()}đ
                    </span>
                  </div>
                  {formData.numberOfChildren > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Trẻ em</span>
                      <span className="text-gray-900">
                        {formData.numberOfChildren} x\n                        {(tour.price * 0.7).toLocaleString()}đ
                      </span>
                    </div>
                  )}
                  {formData.numberOfInfants > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Em bé</span>
                      <span className="text-gray-900">
                        {formData.numberOfInfants} x\n                        {(tour.price * 0.3).toLocaleString()}đ
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-4 mt-4 border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-primary">
                        {calculateTotal().toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 