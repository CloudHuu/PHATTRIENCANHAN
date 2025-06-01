import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API_BASE_URL from '../config/api'; // Thêm dòng này

// Define the type for tour detail data based on backend entity
interface TourDetail {
  id: number; // Expecting number from backend API
  title: string; // Can keep this if backend still returns it, though name is used for display
  name: string; // Use name for main title display
  description: string;
  price: number;
  duration: number; // Number of days from backend
  images: string[]; // Array of image paths
  location: string; // Used for category display
  highlights?: string[]; // Can be nullable
  included?: string[]; // Can be nullable
  excluded?: string[]; // Can be nullable
  isActive: boolean;
  isNew: boolean;
  createdAt: string; // Assuming string date format, adjust if needed
  updatedAt: string; // Assuming string date format, adjust if needed
}

const TourDetailPage: React.FC = () => {
  // Get the tour ID from the URL parameters
  const { id } = useParams<{ id: string }>(); // id is string from URL


  const [tour, setTour] = useState<TourDetail | null>(null); // State to hold tour data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Effect to fetch tour detail when the component mounts or id changes
  useEffect(() => {
    const fetchTourDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the backend API to fetch tour detail by id
        const response = await fetch(`${API_BASE_URL}/tours/${id}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: TourDetail = await response.json();
        console.log('Fetched tour detail:', data);

        setTour(data); // Set fetched data
        setLoading(false);

      } catch (err: any) {
        console.error('Error fetching tour detail:', err);
        setError('Không thể tải chi tiết tour. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    if (id) {
      fetchTourDetail();
    } else {
      // Handle case where id is not present in URL (shouldn't happen with proper routing)
      setError('Không tìm thấy ID tour trong URL.');
      setLoading(false);
    }
  }, [id]); // Rerun effect when id changes

  // Show loading, error, or not found state
  if (loading) return <div className="text-center py-12">Đang tải chi tiết tour...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Lỗi: {error}</div>;
  if (!tour) return <div className="text-center py-12">Không tìm thấy tour.</div>;

  // Render tour details if data is available
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
          <span className="text-gray-900">{tour.name || 'Chi tiết tour'}</span> {/* Use tour.name for title */}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery - Displaying the first image for now */}
            {/* You might want a proper gallery component here */} 
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              {tour.images && tour.images.length > 0 ? (
                  <img
                      src={`${API_BASE_URL}${tour.images[0]}`}
                      alt={tour.name}
                      className="w-full h-96 object-cover"
                  />
              ) : (
                  <img
                      src="https://via.placeholder.com/1200x600"
                      alt="Placeholder"
                      className="w-full h-96 object-cover"
                  />
              )}
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  {/* Display Location as Category */}
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{tour.location}</span>
                  {/* Display Duration */}
                  <span className="text-sm text-gray-500">{tour.duration} ngày</span> {/* Use tour.duration (number) */}
                   {/* Rating and Reviews removed as not in backend entity */}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{tour.name}</h1> {/* Use tour.name */}

                {/* Tour Details Section (replacing tabs) */}
                <div>
                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Mô tả</h3>
                    <div className="prose max-w-none text-gray-800 leading-relaxed">
                      {/* Display description as plain text */}
                      <p>{tour.description}</p>
                      {/* If description can contain HTML, uncomment the line below and remove the <p> tag and its content */}
                      {/* <div dangerouslySetInnerHTML={{ __html: tour.description }} /> */}
                    </div>
                  </div>

                  {/* Highlights */}
                  {tour.highlights && tour.highlights.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Điểm nổi bật</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Included */}
                  {tour.included && tour.included.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Bao gồm</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {tour.included.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Excluded */}
                  {tour.excluded && tour.excluded.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Không bao gồm</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {tour.excluded.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
              {/* Link to booking page */} 
              <Link
                to={`/booking/${tour.id}`}
                className="btn btn-primary w-full text-center transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Đặt tour ngay
              </Link>
            </div>

            {/* Related Tours removed as not in backend entity */} 
             {/* Remove the entire Related Tours block */} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage; 