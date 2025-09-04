import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../hooks/useApi';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import HeroBg from '../assets/hero-bg.png';
import AboutImg1 from '../assets/about-hero.png';
import AboutImg2 from '../assets/contact-hero.png';
import AboutImg3 from '../assets/hero-bg.png';
import AboutImg4 from '../assets/hero-bg.png';
import { Link } from 'react-router-dom';
// import IICFImg from '../assets/hero-bg.png';
// import LogoSponsor from '../assets/logo.png';

// import SponsorAd1 from '../assets/hero-bg.png'; // <-- Impor gambar iklan
// import SponsorAd2 from '../assets/about-hero.png'; // <-- Impor gambar iklan
// import SponsorAd3 from '../assets/contact-hero.png'; // <-- Impor gambar iklan

const HomePage = () => {
    
 // --- State untuk menampung data dari API ---
    const [homeData, setHomeData] = useState({
        carousel: [],
        mainEvents: [],
        testimonials: [],
        sponsors: [],
        sponsorBanners: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:4000/'; // Definisikan base URL backend Anda

    // --- Mengambil data dari API saat komponen dimuat ---
    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                // Endpoint publik tidak memerlukan token, jadi kita gunakan axios langsung
                const response = await api.get('/home'); // Endpoint ke backend Anda
                setHomeData({
                    carousel: response.data.carousel || [],
                    mainEvents: response.data.mainEvents || [],
                    testimonials: response.data.testimonials || [],
                    sponsors: response.data.sponsors || [],
                    sponsorBanners: response.data.sponsorBanners || [],
                });
            } catch (err) {
                setError('Gagal memuat data. Pastikan server backend berjalan.');
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomePageData();
    }, []);

	const about = [
		{id: 1, img: AboutImg1, type: 'large'},
		{id: 2, img: AboutImg2, type: 'large'},
		{id: 3, img: AboutImg3, type: 'small'},
		{id: 4, img: AboutImg4, type: 'small'},
		{id: 5, img: AboutImg2, type: 'large'},
		{id: 6, img: AboutImg4, type: 'large'},
		{id: 7, img: AboutImg2, type: 'small'},
	];
	const [imageSetIndex, setImageSetIndex] = useState(0);

    // 1. Pisahkan gambar berdasarkan tipe menggunakan useMemo untuk efisiensi
    const largeImages = useMemo(() => about.filter(item => item.type === 'large'), [about]);
    const smallImages = useMemo(() => about.filter(item => item.type === 'small'), [about]);

    // 2. useEffect sekarang hanya menaikkan indeks setiap 5 detik
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageSetIndex(prevIndex => prevIndex + 1);
        }, 5000); // Ganti gambar setiap 5 detik

        return () => clearInterval(intervalId);
    }, []);

    // 3. Tentukan gambar mana yang akan ditampilkan berdasarkan indeks saat ini
    const largeIndex = (imageSetIndex * 2) % largeImages.length;
    const smallIndex = (imageSetIndex * 2) % smallImages.length;

    const displayedImages = [
        largeImages[largeIndex],
        smallImages[smallIndex],
        smallImages[(smallIndex + 1) % smallImages.length],
        largeImages[(largeIndex + 1) % largeImages.length]
    ];
    
    const imageGridStyles = [
        "absolute top-0 left-0 w-[248px] h-[310px] object-cover rounded-lg shadow-xl",
        "absolute top-0 left-[260px] w-[248px] h-[248px] object-cover rounded-lg shadow-xl",
        "absolute top-[320px] left-0 w-[248px] h-[248px] object-cover rounded-lg shadow-xl",
        "absolute top-[260px] left-[260px] w-[248px] h-[310px] object-cover rounded-lg shadow-xl"
    ];
    
    // const animationDelays = [0, 0.2, 0.4, 0.6];
    const animationDelays = [0.5, 0.5, 0.5, 0.5];

    useEffect(() => {
        // Cek bahwa homeData bukan nilai awal yang kosong
        if (homeData && homeData.carousel.length > 0) {
            console.log("Data dari API berhasil diterima:", JSON.stringify(homeData, null, 2));
        }
    }, [homeData]);

    // Tampilkan loading indicator jika data belum siap
    if (loading) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    // Tampilkan pesan error jika terjadi kegagalan
    if (error) {
        return <div className="h-screen flex justify-center items-center text-red-500">{error}</div>;
    }

	return (
		<div className='w-full bg-slate-100 relative'>
			<div 
                className="absolute inset-0 opacity-50" // <-- ATUR OPASITAS DI SINI
                style={{
                    backgroundImage: `url('/images/pattern.png')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top',
                    backgroundSize: 'fill' // Gunakan 'contain' atau 'cover' sesuai kebutuhan
                }}
            ></div>
			<div className="relative z-10 font-serif">
                {homeData.carousel && homeData.carousel.length > 0 && (
				<Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={30}
                    slidesPerView={1}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    loop={homeData.carousel.length > 1}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="h-screen"
                >
                    {homeData?.carousel?.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full w-full flex items-center justify-center text-white" style={{ backgroundImage: `url(${API_URL}${slide.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="absolute inset-0 bg-purple-950/70"></div>
                                <div className="relative z-10 text-center px-4">
                                   <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-tight">{slide.alt_text || 'Color Of Indonesia'}</h1>
                                    <p className="mt-4 text-xl md:text-2xl font-light">{slide.subtitle || 'Through the culture, We become One'}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                  )}

				<section className="py-24 px-8 relative bg-main-pattern mx-20">
					{/* Overlay stripes */}
					<div className="absolute inset-0"></div>

					<div className="relative container mx-auto grid md:grid-cols-2 gap-12 items-center">
						{/* Text Section */}
						<div>
							<h2 className="text-4xl font-bold text-brand-purple mb-6">Tentang Kami</h2>
							<h2 className="text-gray-600 mb-8 leading-relaxed text-2xl">
								Color of Indonesia bertujuan memperkenalkan keragaman budaya nusantara ke tingkat global melalui festival,
								pertukaran seni, dan kolaborasi internasional. Sebagai jembatan budaya, inisiatif ini menampilkan Indonesia
								yang inklusif, kreatif, dan berwarna, sekaligus memperkuat identitas bangsa dan peran Indonesia dalam kancah
								budaya dunia.
							</h2>
							<button className="bg-brand-pink text-white italic font-semibold py-3 px-8 rounded-full hover:bg-pink-700 transition-transform hover:scale-105">
								Baca Cerita Kami
							</button>
						</div>

						{/* Image Grid */}
						<div className="relative w-[520px] h-[620px] mx-auto">
                            <AnimatePresence>
                                {displayedImages.map((item, index) => (
                                    <motion.img
                                        key={item.id} // Kunci stabil per item
                                        src={item.img}
                                        alt={`Culture ${item.id}`}
                                        className={imageGridStyles[index]}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ 
                                            duration: 0.8,
                                            delay: animationDelays[index]
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
					</div>
				</section>

                {homeData.sponsorBanners && homeData.sponsorBanners.length > 0 && (
				<section className="py-12 mx-20">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
						effect='fade'
                        loop={homeData.sponsorBanners.length > 1}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="w-full h-[300px] mx-auto rounded-lg overflow-hidden" // Ditambahkan overflow-hidden
                    >
                        {homeData?.sponsorBanners?.map(banner => (
                            <SwiperSlide key={banner.id}>
                                <img src={`${API_URL}${banner.image_url}`} alt={`Sponsor Banner ${banner.id}`} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                )}

                {homeData.mainEvents && homeData.mainEvents.length > 0 && (
				<section className="py-12 text-center mx-20 px-4">
					<h2 className="text-4xl font-bold text-brand-purple mb-4">Mulai Petualanganmu</h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Kami membuka pintu bagi Anda untuk menjelajah, belajar, dan terhubung dengan komunitas global.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {homeData?.mainEvents?.map((event) => (
                            <div key={event.id} className="relative rounded-lg overflow-hidden shadow-2xl group cursor-pointer h-96">
                                <img src={`${API_URL}${event.hero_image_url}`} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-500 group-hover:opacity-0">
                                    <h3 className="text-white text-3xl font-bold">{event.title.split(' ').slice(-1)}</h3> {/* Mengambil kata terakhir sebagai ID visual */}
                                </div>
                                <div className="absolute inset-0 bg-purple-800/60 p-6 flex flex-col justify-start text-left text-white transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                                    <h3 className="text-4xl font-extrabold">{event.title.split(' ').slice(-1)}</h3>
                                    {event.subtitle && <p className="text-lg font-medium">{event.subtitle}</p>}
                                    <p className="text-sm mt-3 font-light leading-relaxed">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <Link to={'/events'}>
					<button className="mt-16 bg-brand-purple text-white font-bold py-3 px-10 rounded-full hover:bg-purple-800 transition-transform hover:scale-105 shadow-lg">
						Selengkapnya
					</button>
                    </Link>
				</section>
                )}
                {homeData.testimonials && homeData.testimonials.length > 0 && (
				<section className="py-15 ">
					<div className="container mx-auto text-center p-4 ">
						<h2 className="text-4xl font-bold text-brand-purple mb-16">Apa Kata Mereka</h2>
						<Swiper
							modules={[Autoplay, EffectFade]}
							effect="fade"
							fadeEffect={{ crossFade: true }} // Menambahkan crossFade untuk transisi yang lebih halus
							slidesPerView={1}
							loop={homeData.testimonials.length > 1}
							allowTouchMove={false}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							className="max-w-4xl mx-auto" // Hapus overflow-hidden dari sini
						>
							{homeData?.testimonials?.map(testimonial => (
                                <SwiperSlide key={testimonial.id}>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[256px]"> 
                                        <img src={`${API_URL}${testimonial.avatar_url}`} alt={testimonial.author_name} className='rounded-lg w-64 h-64 object-cover shadow-lg' />
                                        <div className="max-w-md text-left">
                                            <p className="text-2xl italic text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
                                            <p className="mt-6 font-bold text-lg text-brand-purple">- {testimonial.author_name}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
						</Swiper>
					</div>
				</section>
                )}

                {homeData.sponsors && homeData.sponsors.length > 0 && (
				<section className="py-20 bg-white">
                    <div className="container mx-auto text-center">
                        <h3 className="text-3xl font-bold text-gray-500 mb-12">LOGO-LOGO SPONSOR</h3>
                        <div className="flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
                             {homeData?.sponsors?.map(sponsor => (
                                <div key={sponsor.id} title={sponsor.name}>
                                    <img src={`${API_URL}${sponsor.logo_url}`} alt={sponsor.name} className="h-12 opacity-60 hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                        <button className="mt-16 bg-brand-red text-white font-bold py-3 px-10 rounded-full hover:bg-red-700 transition-transform hover:scale-105 shadow-lg">
                            Selengkapnya
                        </button>
                    </div>
                </section>
                )}
			</div>
		</div>
	);
};

export default HomePage;