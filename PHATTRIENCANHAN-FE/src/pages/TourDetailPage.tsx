import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface TourDetail {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  rating?: number;
  reviews?: number;
  images: string[];
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; activities: string[] }[];
  pricing: { includes: string[]; excludes: string[] };
  relatedTours?: { id: string; title: string; image: string; price: number; duration: string }[];
}

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'pricing'>('overview');

  const [tour, setTour] = useState<TourDetail | null>(null); // State to hold tour data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    const fetchTourDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call to fetch tour detail by id
        // Example: const response = await fetch(`/api/tours/${id}`);
        // const data: TourDetail = await response.json();
        
        // Simulate fetching data
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Mock data structure matching the previous mock, replace with fetched data
        const mockTourData: TourDetail = {
            id: id || '',
            title: 'Tour du lịch Đà Nẵng - Hội An (Fetched)',
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
            description: '<p>Khám phá vẻ đẹp của Đà Nẵng và phố cổ Hội An trong chuyến du lịch 3 ngày 2 đêm đầy thú vị.</p>',
            highlights: [
              'Tham quan bãi biển Mỹ Khê',
              'Khám phá phố cổ Hội An',
            ],
            itinerary: [
              { day: 1, title: 'Ngày 1', activities: ['Hoạt động 1', 'Hoạt động 2'] },
              { day: 2, title: 'Ngày 2', activities: ['Hoạt động 3'] },
            ],
            pricing: {
              includes: ['Vé máy bay', 'Khách sạn'],
              excludes: ['Chi phí cá nhân'],
            },
             relatedTours: [
                {
                  id: '2',
                  title: 'Tour liên quan 1',
                  image: 'https://via.placeholder.com/400x250',
                  price: 3000000,
                  duration: '3 ngày',
                },
             ]
          };

        setTour(mockTourData); // Set fetched data
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetail();
    }
  }, [id]); // Rerun effect when id changes

  // Show loading or error state
  if (loading) return <div className="text-center py-12">Đang tải chi tiết tour...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Lỗi: {error}</div>;
  if (!tour) return <div className="text-center py-12">Không tìm thấy tour.</div>;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors duration-300">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/tours" className="text-gray-500 hover:text-primary transition-colors duration-300">
            Tour du lịch
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{tour.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{tour.category}</span>
                  <span className="text-sm text-gray-500">{tour.duration}</span>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">★</span>
                    <span className="text-gray-700">{tour.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({tour.reviews} đánh giá)
                    </span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{tour.title}</h1>

                {/* Tabs */}
                <div className="border-b mb-6 border-gray-200">
                  <nav className="flex gap-8">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-4 transition-colors duration-300 ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Tổng quan
                    </button>
                    <button
                      onClick={() => setActiveTab('itinerary')}
                      className={`pb-4 transition-colors duration-300 ${activeTab === 'itinerary' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Lịch trình
                    </button>
                    <button
                      onClick={() => setActiveTab('pricing')}
                      className={`pb-4 transition-colors duration-300 ${activeTab === 'pricing' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
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
                        className="prose max-w-none mb-8 text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: tour.description }}
                      />
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Điểm nổi bật
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {tour.highlights.map((highlight: string, index: number) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'itinerary' && ( tour.itinerary && tour.itinerary.length > 0 ? (
                    <div className="space-y-8 text-gray-800 leading-relaxed">
                      {tour.itinerary.map((day: { day: number; title: string; activities: string[] }, index: number) => (
                        <div key={index} className="border-b pb-6 border-gray-200 last:border-b-0">
                          <h3 className="text-xl font-semibold mb-4 text-gray-900">
                            Ngày {day.day}: {day.title}
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {day.activities.map((activity: string, index: number) => (
                              <li key={index}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (<p>Không có thông tin lịch trình.</p>))}

                  {activeTab === 'pricing' && ( tour.pricing ? (
                    <div className="text-gray-800 leading-relaxed">
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Bao gồm</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {tour.pricing.includes.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                          Không bao gồm
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {tour.pricing.excludes.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (<p>Không có thông tin giá.</p>))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="text-3xl font-bold text-primary mb-4">
                {tour.price.toLocaleString()}đ
              </div>
              <Link
                to={`/booking/${tour.id}`}
                className="btn btn-primary w-full text-center transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Đặt tour ngay
              </Link>
            </div>

            {/* Related Tours */}
            {tour.relatedTours && tour.relatedTours.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Tour liên quan</h2>
                <div className="space-y-6">
                  {tour.relatedTours.map((item: { id: string; title: string; image: string; price: number; duration: string }, index: number) => (
                    <Link
                      key={item.id}
                      to={`/tours/${item.id}`}
                      className="block group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage; 