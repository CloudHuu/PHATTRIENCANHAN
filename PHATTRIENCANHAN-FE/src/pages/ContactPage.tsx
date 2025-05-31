import React, { useState, FormEvent } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Placeholder for form submission logic
        console.log('Form submitted:', formData);
        alert('Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ sớm.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-teal-600 text-white py-16">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            fill="#ffffff"
                            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Hãy liên hệ với BenThanhTourist để được hỗ trợ về các tour du lịch và thông tin chi tiết.
                    </p>
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Contact Form */}
                        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-6">Gửi Tin Nhắn</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Họ và Tên
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Tin Nhắn
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
                                >
                                    Gửi
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:w-1/3">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-6">Thông Tin Liên Hệ</h2>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 mr-3 mt-1 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 2a8 8 0 00-8 8c0 3.86 2.77 7.07 6.5 7.78v2.72a1 1 0 001.55.83l3-2a1 1 0 00.45-.83v-2.28A7.95 7.95 0 0018 10a8 8 0 00-8-8zm-1 12v-2H7v2h2zm2-2v2h2v-2h-2zm-2-4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                                    </svg>
                                    123 Đường ABC, Quận XYZ, TP.HCM
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 mr-3 mt-1 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    (84) 123-456-789
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 mr-3 mt-1 text-teal-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    info@newstravel.com
                                </li>
                            </ul>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-teal-700 mb-3">Tìm Chúng Tôi</h3>
                                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500">Bản đồ Google Maps (Placeholder)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;