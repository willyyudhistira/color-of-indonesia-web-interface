import React, { useState, useEffect, useMemo } from 'react';

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
import IICFImg from '../assets/hero-bg.png';
import LogoSponsor from '../assets/logo.png';

import SponsorAd1 from '../assets/hero-bg.png'; // <-- Impor gambar iklan
import SponsorAd2 from '../assets/about-hero.png'; // <-- Impor gambar iklan
import SponsorAd3 from '../assets/contact-hero.png'; // <-- Impor gambar iklan

const HomePage = () => {

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

	const heroSlides = [
        {
            id: 1,
            image: HeroBg,
            title: 'Color Of Indonesia',
            subtitle: 'Through the culture, We become One'
        },
        {
            id: 2,
            image: AboutImg1,
            title: 'Discover The Archipelago',
            subtitle: 'A Journey Through a Thousand Islands'
        },
        {
            id: 3,
            image: AboutImg1,
            title: 'Embrace The Diversity',
            subtitle: 'Unity in Every Performance'
        }
    ];

	const sponsorAds = [
        { id: 1, imageUrl: SponsorAd1, alt: 'Iklan Sponsor 1' },
        { id: 2, imageUrl: SponsorAd2, alt: 'Iklan Sponsor 2' },
        { id: 3, imageUrl: SponsorAd3, alt: 'Iklan Sponsor 3' }
    ];

	const sponsorLogos = [
        { id: 1, name: 'Sponsor A', logoUrl: LogoSponsor },
        { id: 2, name: 'Sponsor B', logoUrl: LogoSponsor },
        { id: 3, name: 'Sponsor C', logoUrl: LogoSponsor },
        { id: 4, name: 'Sponsor D', logoUrl: LogoSponsor },
        { id: 5, name: 'Sponsor E', logoUrl: LogoSponsor },
    ];

	const adventures = [
		{
			id: 'YIDC',
			title: 'Yogya International Dance Culture',
			description: 'A spectacular festival celebrating the art of dance from Indonesia and across the globe. Experience the beauty of movement, rhythm, and cultural harmony in the historic city of Yogyakarta, where tradition meets creativity.',
			img: IICFImg // Ganti dengan gambar yang sesuai jika berbeda
		},
		{
			id: 'APIFF',
			title: 'International Folklore Festival',
			subtitle: 'Adventure Pinrang',
			description: 'A dynamic celebration of world folklore traditions set in the heart of Sulawesi. Join us for breathtaking cultural performances, traditional music, and dance that unite communities and honor the beauty of diversity.',
			img: IICFImg // Ganti dengan gambar yang sesuai jika berbeda
		},
		{
			id: 'BIFF',
			title: 'Bali International Folklore Festival',
			description: 'An extraordinary showcase of traditional folklore from around the world, hosted on the beautiful island of Bali. Experience captivating dance, music, and cultural performances that celebrate heritage, creativity, and unity among nations.',
			img: IICFImg // Ganti dengan gambar yang sesuai jika berbeda
		},
		{
			id: 'IICF',
			title: 'Indonesia International Culture Festival',
			description: 'A vibrant celebration of Indonesia’s rich cultural heritage, featuring traditional music, dance performances, art exhibitions, and culinary experiences. This festival brings together participants from around the world to share culture, creativity, and friendship in an unforgettable global atmosphere.',
			img: IICFImg // Ganti dengan gambar yang sesuai jika berbeda
		}
	];

	const testimonials = [
        {
            id: 1,
            quote: "Setiap event membawa Anda lebih dekat ke impian Anda untuk melanjutkan jenjang studi dan terhubung dengan komunitas global.",
            author: "Pegiat Pengirim",
            imageUrl: SponsorAd1 // Ganti dengan path gambar testimoni
        },
        {
            id: 2,
            quote: "Pengalaman yang luar biasa! Saya belajar banyak tentang budaya lain dan juga tentang diri saya sendiri.",
            author: "Peserta 2024",
            imageUrl: SponsorAd2 // Ganti dengan path gambar testimoni
        },
        {
            id: 3,
            quote: "Organisasinya sangat profesional. Acara ini membuka banyak pintu kesempatan bagi saya di kancah internasional.",
            author: "Alumni Program",
            imageUrl: SponsorAd3 // Ganti dengan path gambar testimoni
        }
    ];

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
				<Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={30}
                    slidesPerView={1}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="h-screen"
                >
                    {heroSlides.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-full w-full flex items-center justify-center text-white" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="absolute inset-0 bg-purple-950/70"></div>
                                <div className="relative z-10 text-center px-4">
                                    <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-tight">{slide.title}</h1>
                                    <p className="mt-4 text-xl md:text-2xl font-light">{slide.subtitle}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

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


				<section className="py-12 mx-20">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
						effect='fade'
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        className="w-full h-[300px] mx-auto rounded-lg overflow-hidden" // Ditambahkan overflow-hidden
                    >
                        {sponsorAds.map(ad => (
                            <SwiperSlide key={ad.id}>
                                <img 
                                    src={ad.imageUrl} 
                                    alt={ad.alt} 
                                    className="w-full h-full object-cover" 
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

				<section className="py-12 text-center mx-20 px-4">
					<h2 className="text-4xl font-bold text-brand-purple mb-4">Mulai Petualanganmu</h2>
					<p className="text-gray-600 mb-12 max-w-2xl mx-auto">Kami membuka pintu bagi Anda untuk menjelajah, belajar, dan terhubung dengan komunitas global.</p>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{adventures.map((event) => (
							<div key={event.id} className="relative rounded-lg overflow-hidden shadow-2xl group cursor-pointer h-96">
								{/* Background Image */}
								<img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

								{/* Initial State: Judul besar di bawah */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 transition-opacity duration-500 group-hover:opacity-0">
									<h3 className="text-white text-3xl font-bold">{event.id}</h3>
								</div>

								{/* Hover State: Overlay ungu semi-transparan dengan deskripsi */}
								<div className="absolute inset-0 bg-purple-800/60
								p-6 flex flex-col justify-start text-left text-white
								transition-opacity duration-500 opacity-0 group-hover:opacity-100">
									<h3 className="text-4xl font-extrabold">{event.id}</h3>
									{event.subtitle && <p className="text-lg font-medium">{event.subtitle}</p>}
									<p className="text-lg font-semibold mt-2">{event.title}</p>
									<p className="text-sm mt-3 font-light leading-relaxed">{event.description}</p>
								</div>
							</div>
						))}
					</div>

					<button className="mt-16 bg-brand-purple text-white font-bold py-3 px-10 rounded-full hover:bg-purple-800 transition-transform hover:scale-105 shadow-lg">
						Selengkapnya
					</button>
				</section>

				<section className="py-15 ">
					<div className="container mx-auto text-center p-4 ">
						<h2 className="text-4xl font-bold text-brand-purple mb-16">Apa Kata Mereka</h2>
						<Swiper
							modules={[Autoplay, EffectFade]}
							effect="fade"
							fadeEffect={{ crossFade: true }} // Menambahkan crossFade untuk transisi yang lebih halus
							slidesPerView={1}
							loop={true}
							allowTouchMove={false}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							className="max-w-4xl mx-auto" // Hapus overflow-hidden dari sini
						>
							{testimonials.map(testimonial => (
								<SwiperSlide key={testimonial.id}>
									{/* Atur tinggi minimum dan layout di sini */}
									<div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[256px]"> 
										<img 
											src={testimonial.imageUrl} 
											alt={testimonial.author} 
											className='rounded-lg w-64 h-64 object-cover shadow-lg' // object-cover lebih baik dari bg-auto
										/>
										<div className="max-w-md text-left">
											<p className="text-2xl italic text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
											<p className="mt-6 font-bold text-lg text-brand-purple">- {testimonial.author}</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</section>

				<section className="py-20 bg-white">
                    <div className="container mx-auto text-center">
                        <h3 className="text-3xl font-bold text-gray-500 mb-12">LOGO-LOGO SPONSOR</h3>
                        <div className="flex justify-center items-center gap-x-12 gap-y-8 flex-wrap">
                            {sponsorLogos.map(sponsor => (
                                <div key={sponsor.id} title={sponsor.name}>
                                    <img src={sponsor.logoUrl} alt={sponsor.name} className="h-12 opacity-60 hover:opacity-100 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                        <button className="mt-16 bg-brand-red text-white font-bold py-3 px-10 rounded-full hover:bg-red-700 transition-transform hover:scale-105 shadow-lg">
                            Selengkapnya
                        </button>
                    </div>
                </section>
			</div>
		</div>
	);
};

export default HomePage;