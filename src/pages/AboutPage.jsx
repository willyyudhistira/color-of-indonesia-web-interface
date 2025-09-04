import React, { useState, useEffect } from 'react';
import { api } from '../hooks/useApi';

import HeroBgAbout from '../assets/about-hero.png';
import MainPattern from '../assets/pattern.png';

const AboutPage = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:4000'; // Sesuaikan dengan URL backend Anda

    // --- Mengambil data dari API saat komponen dimuat ---
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                // Panggil endpoint publik untuk program
                const response = await api.get('/programs');
                setPrograms(response.data);
            } catch (err) {
                setError('Gagal memuat data program.');
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []); 

    return (
        <div className="w-full bg-slate-100 relative">
            <div 
                className="absolute inset-0 opacity-50" // <-- ATUR OPASITAS DI SINI
                style={{
                    backgroundImage: `url(${MainPattern})`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top',
                    backgroundSize: 'fill'
                }}
            ></div>
            <div className="relative z-10">
                {/* Hero */}
                <section
                    className="relative h-96 flex items-center justify-center text-white"
                    style={{
                        backgroundImage: `url(${HeroBgAbout})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-center">
                        Lebih Dekat Dengan Kami
                    </h1>
                </section>

                {/* Background */}
                <div className="container mx-auto py-16">
                    <section className="max-w-5xl mx-auto mb-20">
                        <h2 className="text-4xl font-bold text-brand-purple mb-6 relative">
                            Background
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg text-justify">
                            Color of Indonesia lahir dari semangat untuk memperkenalkan keragaman budaya nusantara ke panggung dunia.
                            Indonesia sebagai negara kepulauan memiliki ribuan warisan budaya, baik yang berwujud seni pertunjukan, musik, tari, maupun tradisi lisan.
                            Namun, potensi besar ini belum sepenuhnya dikenal secara luas di tingkat internasional.
                            <br /><br />
                            Melalui festival budaya, pertukaran seni, serta kolaborasi dengan berbagai komunitas global,
                            Color of Indonesia berkomitmen menghadirkan wajah Indonesia yang inklusif, kreatif, dan penuh warna.
                            Kehadiran Color of Indonesia bukan hanya sebagai penyelenggara festival, tetapi juga sebagai cultural bridge yang menghubungkan masyarakat dunia dengan Indonesia melalui seni dan budaya.
                            <br /><br />
                            Dengan menjadikan budaya sebagai sarana diplomasi, Color of Indonesia mendukung upaya memperkuat identitas bangsa sekaligus menempatkan Indonesia sebagai bagian penting dalam percaturan budaya global.
                        </p>
                    </section>

                    {/* Visi & Misi */}
                    <section className="max-w-5xl mx-auto mb-20 space-y-10 bg-purple-600/50 p-10 rounded-2xl shadow-lg">
                        {/* VISI */}
                        <div className="bg-purple-50 p-10 rounded-2xl shadow-md text-center">
                            <h2 className="text-3xl font-extrabold text-brand-purple mb-4">VISI</h2>
                            <p className="text-xl text-gray-800 italic">
                                “Menjadikan budaya Indonesia sebagai warna dunia melalui festival, kolaborasi, dan diplomasi budaya.”
                            </p>
                        </div>

                        {/* MISI */}
                        <div className="bg-purple-50 p-10 rounded-2xl shadow-md border border-gray-200">
                            <h2 className="text-3xl font-extrabold text-brand-purple mb-6 text-center">MISI</h2>
                            <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
                                <li>Memperkenalkan keberagaman budaya Indonesia ke tingkat nasional dan internasional melalui festival dan program pertukaran budaya.</li>
                                <li>Mendukung diplomasi budaya Indonesia sebagai bagian dari promosi citra bangsa di mata dunia.</li>
                                <li>Memberdayakan seniman, komunitas, dan generasi muda agar aktif melestarikan dan mengembangkan budaya bangsa.</li>
                                <li>Menghubungkan budaya Indonesia dengan dunia melalui kolaborasi lintas negara, seni, dan teknologi.</li>
                                <li>Menjadikan Jakarta dan kota-kota di Indonesia sebagai pusat aktivitas budaya internasional.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Program */}
                     <section className="mx-auto">
                        <h2 className="text-4xl font-bold text-brand-purple text-center mb-12">
                            Program Kami
                        </h2>
                        
                        {/* Tampilkan loading state */}
                        {loading && <p className="text-center">Loading programs...</p>}
                        
                        {/* Tampilkan error state */}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        
                        {/* Tampilkan data jika sudah selesai loading dan tidak ada error */}
                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                {programs.map((program, index) => (
                                    <div key={program.id} className="relative group h-150 overflow-hidden">
                                        {/* Gunakan icon_url dari database */}
                                        <img 
                                            src={`${API_URL}${program.icon_url}`} 
                                            alt={program.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Overlay saat tidak di-hover */}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-transform duration-500 group-hover:opacity-0">
                                            <h3 className="text-white text-2xl font-bold text-center px-4 leading-snug">
                                                {program.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Overlay saat di-hover */}
                                        <div className="absolute inset-0 bg-purple-800/60 p-6 flex flex-col justify-start text-left text-white transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                                            <h3 className="text-4xl font-extrabold">{program.title}</h3>
                                            {/* Menampilkan subtitle jika ada */}
                                            {/* {program.subtitle && <p className="text-lg font-medium mt-1">{program.subtitle}</p>} */}
                                            <p className="text-sm mt-3 font-light leading-relaxed">{program.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="text-center mt-16">
                            <h3 className="text-2xl font-semibold text-purple-700 italic">
                                "Bergabunglah dengan program kami dan mulailah perjalanan Anda"
                            </h3>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
