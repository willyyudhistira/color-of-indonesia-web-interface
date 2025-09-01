import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import HeroBgEvents from '../assets/hero-bg.png'; // Ganti dengan gambar hero yang sesuai
import MainPattern from '../assets/pattern.png';
import EventImg1 from '../assets/EventsImg (1).png'; // Ganti dengan gambar event
import EventImg2 from '../assets/EventsImg (2).png'; // Ganti dengan gambar event
import EventImg3 from '../assets/EventsImg (3).png'; // Ganti dengan gambar event
import EventImg4 from '../assets/EventsImg (4).png'; // Ganti dengan gambar event

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const EventsPage = () => {
    // Data untuk Upcoming Events Carousel
    const upcomingEvents = [
        {
            id: 1,
            title: 'Indonesia International Culture Festival 2025',
            location: 'Taman Mini Indonesia Indah',
            date: 'October 28, 2025',
            image: EventImg1,
        },
        {
            id: 2,
            title: 'Archipelago Arts & Crafts Expo 2025',
            location: 'Jakarta Convention Center',
            date: 'November 15, 2025',
            image: EventImg2,
        },
    ];

    // Data untuk All Events
    const allEvents = [
        {
            id: 1,
            title: 'Bali International Folklore Festival 2025',
            location: 'Taman Mini Indonesia Indah',
            date: 'October 28, 2025',
            image: EventImg2,
        },
        {
            id: 2,
            title: 'Adventure Pinrang International Folklore Festival 2025',
            location: 'Taman Mini Indonesia Indah',
            date: 'October 28, 2025',
            image: EventImg3,
        },
        {
            id: 3,
            title: 'Yogya International Dance Culture 2025',
            location: 'Taman Mini Indonesia Indah',
            date: 'October 28, 2025',
            image: EventImg4,
        },
    ];

    return (
        <div className="bg-white relative">
            <div 
                className="absolute inset-0 opacity-50 z-0" // Atur opasitas & z-index
                style={{
                    backgroundImage: `url(${MainPattern})`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top',
                    backgroundSize: 'fill'
                }}
            ></div>
            <div className="relative z-10">
                <section className="relative h-96 flex items-center justify-center text-white" style={{ backgroundImage: `url(${HeroBgEvents})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold">Your Journey Begins</h1>
                </section>
                <div className=" mx-20 px-6">
                    {/* ======== UPCOMING EVENTS SECTION ======== */}
                    <section className="mb-20">
                        <h2 className="text-4xl font-bold text-brand-purple mb-8">Upcoming</h2>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            loop={true}
                            className="w-full"
                        >
                            {upcomingEvents.map(event => (
                                <SwiperSlide key={event.id}>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                        <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <FaMapMarkerAlt className="mr-3 text-brand-pink" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-6">
                                                <FaCalendarAlt className="mr-3 text-brand-pink" />
                                                <span>{event.date}</span>
                                            </div>
                                            <button className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-800 transition-colors">
                                                More Information
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>

                    {/* ======== ALL EVENTS SECTION ======== */}
                    <section>
                        <h2 className="text-4xl font-bold text-brand-purple mb-8">All Events</h2>
                        <div className="space-y-8">
                            {allEvents.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                    <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <FaMapMarkerAlt className="mr-3 text-brand-pink" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 mb-6">
                                            <FaCalendarAlt className="mr-3 text-brand-pink" />
                                            <span>{event.date}</span>
                                        </div>
                                        <button className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-800 transition-colors">
                                            More Information
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dummy */}
                        <div className="flex justify-center items-center space-x-2 mt-12">
                            <button className="w-10 h-10 rounded-full bg-brand-purple text-white font-bold">1</button>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">2</button>
                            <span className="text-gray-500">...</span>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">8</button>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">&gt;</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;