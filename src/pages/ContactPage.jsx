import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import HeroBgContact from '../assets/contact-hero.png';
import MainPattern from '../assets/pattern.png';

const ContactPage = () => {
    return (
        <div className='bg-white relative'>
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
                <section className="relative h-96 flex items-center justify-center text-white" style={{ backgroundImage: `url(${HeroBgContact})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-center px-4">Get In Touch With Us</h1>
                </section>

                <section className="py-24 bg-main-pattern">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-brand-purple mb-4">Contact Us</h2>
                            <p className="text-gray-600 mb-12">Kami senang mendengar dari Anda. Silakan isi form di bawah atau hubungi kami langsung.</p>
                        </div>
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 bg-white/80 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                            <form className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" id="name" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" id="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                </div>
                                <div>
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <input type="text" id="subject" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                            </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Message</label>
                                    <textarea id="message" placeholder="Your Message" rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Submit
                                </button>
                            </form>

                            <div className="bg-pink-50 p-8 rounded-xl flex flex-col justify-center space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800">Quick Contact</h3>
                                <div className="flex items-center">
                                    <FaPhoneAlt className="text-brand-pink mr-4" size={20} />
                                    <span className="text-gray-700 text-lg">+6281211603309</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-brand-pink mr-4" size={20} />
                                    <span className="text-gray-700 text-lg">info@colorofindonesia.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;