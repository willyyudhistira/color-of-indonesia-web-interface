import React from 'react';
import HeroBgAbout from '../assets/about-hero.png';
import Prog1 from '../assets/hero-bg.png';
import Prog2 from '../assets/hero-bg.png';
import Prog3 from '../assets/hero-bg.png';
import Prog4 from '../assets/hero-bg.png';
import MainPattern from '../assets/pattern.png';

const AboutPage = () => {
    const program = [
        { image: Prog1, title: "International Culture Festivals" },
        { image: Prog2, title: "Cultural Exchange & Delegation" },
        { image: Prog3, title: "Youth & Education Program" },
        { image: Prog4, title: "Community Empowerment" },
    ];

    const programs = [
        {
            id: '1',
            title: 'International Culture Festivals',
            description: 'Program unggulan berupa penyelenggaraan festival budaya internasional di Indonesia maupun partisipasi pada festival dunia. Lewat festival ini, Color of Indonesia menghadirkan seni musik, tari, folklore, hingga kuliner sebagai representasi keragaman nusantara dan internacional di panggung global.',
            image: Prog1,
        },
        {
            id: '2',
            title: 'Cultural Exchange & Delegation',
            description: 'Kami secara rutin mengirim delegasi seni budaya untuk tampil memenuhu undangan di berbagai festival internasional. Program ini menjadi ajang pertukaran budaya (cultural diplomacy) yang memperkuat citra Indonesia sebagai bangsa yang ramah, kreatif, dan multikultural.',
            image: Prog2,
        },
        {
            id: '3',
            title: 'Youth & Education Program',
            description: 'Generasi muda menjadi fokus utama kami. Melalui workshop, kelas kreatif, dan program edutour yang berbasis budaya maupun teknologi serta pengetahun sejarah, Color of Indonesia memperkenalkan aktivitas dengan pendekatan modern yang beredukasi dan menyenangkan, baik bagi pelajar dalam negeri maupun luar negeri.',
            image: Prog3,
        },
        {
            id: '4',
            title: 'Community Empowerment',
            description: 'Selain festival, kami juga memberdayakan komunitas seni lokal melalui pelatihan, kolaborasi, dan promosi karya. Program ini memastikan bahwa keberagaman budaya tetap hidup, berkembang, dan berdaya secara ekonomi.',
            image: Prog4,
        }
    ]

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            {programs.map((program, index) => (
                                <div key={index} className="relative group h-150 overflow-hidden">
                                    <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>

                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-transform duration-500 group-hover:opacity-0">
                                        <h3 className="text-white text-2xl font-bold text-center px-4 leading-snug">
                                            {program.title}
                                        </h3>
                                    </div>

                                    <div className="absolute inset-0 bg-purple-800/60
                                    p-6 flex flex-col justify-start text-left text-white
                                    transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                                        <h3 className="text-4xl font-extrabold">{program.title}</h3>
                                        {/* {program.title && <p className="text-lg font-medium">{program.title}</p>} */}
                                        {/* <p className="text-lg font-semibold mt-2">{program.title}</p> */}
                                        <p className="text-sm mt-3 font-light leading-relaxed">{program.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
