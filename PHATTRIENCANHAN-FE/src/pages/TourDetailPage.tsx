import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'pricing'>('overview');

  // Mock data - In real app, this would come from an API
  const tour = {
    id: id,
    title: 'Tour du lịch Đà Nẵng - Hội An',
    category: 'Tour trong nước',
    duration: '3 ngày 2 đêm',
    price: 2500000,
    rating: 4.5,
    reviews: 128,
    images: [
      'https://via.placeholder.com/1200x600',
      'https://via.placeholder.com/1200x600',
      'https://via.placeholder.com/1200x600',
    ],
    description: `
      <p>Khám phá vẻ đẹp của Đà Nẵng và phố cổ Hội An trong chuyến du lịch 3 ngày 2 đêm đầy thú vị. Tour bao gồm các điểm tham quan nổi tiếng, ẩm thực đặc sắc và trải nghiệm văn hóa độc đáo.</p>
    `,
    highlights: [
      'Tham quan bãi biển Mỹ Khê - một trong những bãi biển đẹp nhất thế giới',
      'Khám phá phố cổ Hội An - di sản văn hóa thế giới',
      'Thưởng thức ẩm thực đặc sắc của miền Trung',
      'Trải nghiệm văn hóa địa phương',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đà Nẵng - Bãi biển Mỹ Khê',
        activities: [
          'Đón khách tại sân bay Đà Nẵng',
          'Ăn trưa tại nhà hàng địa phương',
          'Tham quan bãi biển Mỹ Khê',
          'Ăn tối và nghỉ đêm tại khách sạn',
        ],
      },
      {
        day: 2,
        title: 'Hội An - Phố cổ',
        activities: [
          'Ăn sáng tại khách sạn',
          'Di chuyển đến Hội An',
          'Tham quan phố cổ Hội An',
          'Ăn tối và nghỉ đêm tại Hội An',
        ],
      },
      {
        day: 3,
        title: 'Hội An - Đà Nẵng',
        activities: [
          'Ăn sáng tại khách sạn',
          'Mua sắm tại chợ Hội An',
          'Ăn trưa và trả phòng',
          'Tiễn khách tại sân bay Đà Nẵng',
        ],
      },
    ],
    pricing: {
      includes: [
        'Vé máy bay khứ hồi',
        'Khách sạn 3-4 sao',
        'Ăn uống theo chương trình',
        'Vé tham quan các điểm du lịch',
        'Hướng dẫn viên chuyên nghiệp',
        'Bảo hiểm du lịch',
      ],
      excludes: [
        'Chi phí cá nhân',
        'Đồ uống trong bữa ăn',
        'Phí phát sinh ngoài chương trình',
      ],
    },
    relatedTours: [
      {
        id: '2',
        title: 'Tour du lịch Nha Trang',
        image: 'https://via.placeholder.com/400x250',
        price: 3200000,
        duration: '3 ngày 2 đêm',
      },
      {
        id: '3',
        title: 'Tour du lịch Sapa',
        image: 'https://via.placeholder.com/400x250',
        price: 2800000,
        duration: '3 ngày 2 đêm',
      },
    ],
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/tours" className="text-gray-500 hover:text-primary">
            Tour du lịch
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{tour.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tour.category}
                  </span>
                  <span className="text-sm text-gray-500">{tour.duration}</span>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">★</span>
                    <span className="text-gray-700">{tour.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({tour.reviews} đánh giá)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-6">{tour.title}</h1>

                {/* Tabs */}
                <div className="border-b mb-6">
                  <nav className="flex gap-8">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-4 ${
                        activeTab === 'overview'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Tổng quan
                    </button>
                    <button
                      onClick={() => setActiveTab('itinerary')}
                      className={`pb-4 ${
                        activeTab === 'itinerary'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Lịch trình
                    </button>
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className={`pb-4 ${
                        activeTab === 'pricing'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Giá & Điều khoản
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === 'overview' && (
                    <div>
                      <div
                        className="prose max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: tour.description }}
                      />
                      <h3 className="text-xl font-semibold mb-4">
                        Điểm nổi bật
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'itinerary' && (
                    <div className="space-y-8">
                      {tour.itinerary.map((day) => (
                        <div key={day.day} className="border-b pb-6">
                          <h3 className="text-xl font-semibold mb-4">
                            Ngày {day.day}: {day.title}
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {day.activities.map((activity, index) => (
                              <li key={index}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'pricing' && (
                    <div>
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Bao gồm</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {tour.pricing.includes.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Không bao gồm
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {tour.pricing.excludes.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="text-3xl font-bold text-primary mb-4">
                {tour.price.toLocaleString()}đ
              </div>
              <Link
                to={`/booking/${tour.id}`}
                className="btn btn-primary w-full text-center"
              >
                Đặt tour ngay
              </Link>
            </div>

            {/* Related Tours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Tour liên quan</h2>
              <div className="space-y-6">
                {tour.relatedTours.map((item) => (
                  <Link
                    key={item.id}
                    to={`/tours/${item.id}`}
                    className="block group"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.duration}
                        </p>
                        <p className="text-primary font-semibold mt-1">
                          {item.price.toLocaleString()}đ
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage; 