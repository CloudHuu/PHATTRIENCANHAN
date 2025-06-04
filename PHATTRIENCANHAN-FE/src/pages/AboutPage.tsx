import React from 'react';
import { Link } from 'react-router-dom';
import { Script } from 'vm';
import { useEffect, useRef, useState } from "react";

const AboutPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3;
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 3000); // chuyển ảnh mỗi 3 giây

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-teal-600 text-white py-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/image/lienhe.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-100"
                    />
                </div>
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            fill="#ffffff"
                            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Về BenThanhTourist</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Khám phá thế giới cùng chúng tôi - mang đến những hành trình du lịch đáng nhớ và trải nghiệm văn hóa độc đáo.
                    </p>
                </div>
            </section>

            {/* Company Overview */}
           <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Carousel bên trái */}
                        <div className="md:w-1/2 relative overflow-hidden rounded-lg shadow-md">
                            <div
                                ref={carouselRef}
                                className="flex transition-transform duration-700 ease-in-out w-full"
                                style={{ width: "100%" }}
                            >
                                <img src="/image/sapa3.jpg" alt="Ảnh 1" className="w-full object-cover" />
                                <img src="/image/slide22.jpg" alt="Ảnh 2" className="w-full object-cover" />
                                <img src="/image/danang3.jpg" alt="Ảnh 3" className="w-full object-cover" />
                            </div>
                        </div>

                        {/* Nội dung bên phải */}
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Giới thiệu về BenThanhTourist</h2>
                            <p className="text-gray-600 text-base mb-4">
                                BenThanhTourist là một trong những công ty lữ hành hàng đầu tại Việt Nam, với hơn 30 năm kinh nghiệm hoạt động trong lĩnh vực du lịch trong nước và quốc tế. Được thành lập từ năm 1989, BenThanhTourist đã xây dựng thương hiệu uy tín, chuyên cung cấp các dịch vụ:
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 text-base mb-4 space-y-2">
                                <li>Tour du lịch trong nước và quốc tế</li>
                                <li>Dịch vụ vé máy bay, visa, đặt phòng khách sạn</li>
                                <li>Tổ chức sự kiện, hội nghị, teambuilding</li>
                                <li>Tư vấn và thiết kế tour riêng theo yêu cầu khách hàng</li>
                            </ul>
                            <p className="text-gray-600 text-base mb-4">
                                Với đội ngũ nhân viên chuyên nghiệp, tận tâm và am hiểu sâu sắc về văn hóa lịch sử địa phương, BenThanhTourist cam kết mang đến cho khách hàng những trải nghiệm du lịch chất lượng, độc đáo và đầy cảm hứng.
                            </p>
                            <p className="text-gray-600 text-base mb-4">
                                Chúng tôi không chỉ là đơn vị tổ chức chuyến đi, mà còn là người bạn đồng hành đáng tin cậy, giúp bạn khám phá thế giới một cách trọn vẹn và an toàn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
                    <p className="text-gray-600 text-base max-w-3xl mx-auto">
                        Chúng tôi cam kết mang đến những hành trình an toàn, thú vị và bền vững, giúp du khách khám phá vẻ đẹp của Việt Nam và thế giới, đồng thời tôn vinh giá trị văn hóa và bảo vệ môi trường.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-8 text-center">Đội Ngũ Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Team Member 1 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                            <img
                                src="/image/team1.jpg"
                                alt="Team Member"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800">Nguyễn Văn An</h3>
                                <p className="text-gray-600 text-sm">Giám đốc Điều hành</p>
                            </div>
                        </div>
                        {/* Team Member 2 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                            <img
                                src="/image/team2.jpg"
                                alt="Team Member"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800">Trần Thị Bình</h3>
                                <p className="text-gray-600 text-sm">Quản lý Tour</p>
                            </div>
                        </div>
                        {/* Team Member 3 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                            <img
                                src="/image/team3.jpg"
                                alt="Team Member"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800">Lê Minh Châu</h3>
                                <p className="text-gray-600 text-sm">Chuyên viên Marketing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;