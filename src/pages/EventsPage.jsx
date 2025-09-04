import React, {useState, useEffect} from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import HeroBgEvents from '../assets/hero-bg.png'; // Ganti dengan gambar hero yang sesuai
import MainPattern from '../assets/pattern.png';
import { api } from '../hooks/useApi';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const EventsPage = () => {
    const [pageData, setPageData] = useState({ featuredEvents: [], paginatedEvents: { data: [], totalPages: 1 } });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://localhost:4000';

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/events?page=${currentPage}`);
                setPageData(response.data);
            } catch (error) {
                console.error("Gagal mengambil data event:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [currentPage]);
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (loading) return <div>Loading...</div>

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
               <div className="mx-20 px-6 py-12">
                    {pageData.featuredEvents.length > 0 && (
                        <section className="mb-20">
                            <h2 className="text-4xl font-bold text-brand-purple mb-8">Upcoming</h2>
                            <Swiper modules={[Navigation]} spaceBetwueen={30} slidesPerView={1} classname="w-full" loop={pageData.featuredEvents.length > 1} navigation>
                                {pageData.featuredEvents.map(event => (
                                    <SwiperSlide key={event.id}>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                            <img src={`${API_URL}${event.hero_image_url}`} alt={event.title} className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold">{event.title}</h3>
                                                <div className="flex items-center my-2"><FaMapMarkerAlt className="mr-3" /><span>{event.location_name}</span></div>
                                                <div className="flex items-center mb-6"><FaCalendarAlt className="mr-3" /><span>{formatDate(event.start_date)}</span></div>
                                                <a href={event.form_url} target="_blank" rel="noopener noreferrer" className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-full">
                                                    More Information
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    )}

                    <section>
                        <h2 className="text-4xl font-bold text-brand-purple mb-8">All Events</h2>
                        <div className="space-y-8">
                            {pageData.paginatedEvents.data.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                    <img src={`${API_URL}${event.hero_image_url}`} alt={event.title} className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold">{event.title}</h3>
                                        <div className="flex items-center my-2"><FaMapMarkerAlt className="mr-3" /><span>{event.location_name}</span></div>
                                        <div className="flex items-center mb-6"><FaCalendarAlt className="mr-3" /><span>{formatDate(event.start_date)}</span></div>
                                        <a href={event.form_url} target="_blank" rel="noopener noreferrer" className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-full">
                                            More Information
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-2 mt-12">
                            {Array.from({ length: pageData.paginatedEvents.totalPages }, (_, i) => i + 1).map(page => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-full font-bold ${currentPage === page ? 'bg-brand-purple text-white' : 'bg-white hover:bg-purple-100'}`}>
                                    {page}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;