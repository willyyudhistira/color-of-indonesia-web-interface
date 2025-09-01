import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';
// Hapus: import Logo from '../assets/logo.png';

const Footer = () => {
	return (
		<footer className="bg-brand-purple text-white bg-batik-pattern bg-cover">
			<div className="mx-20 px-6 py-16">
				<div className="grid md:grid-cols-3 gap-12">
					<div className="flex flex-col items-center md:items-start text-center md:text-left">
						<img src="/assets/logo.png" alt="Color Of Indonesia Logo" className="h-16 mb-4" />
						<p className="font-bold text-lg">Color Of Indonesia</p>
						<div className="flex space-x-5 mt-6">
							<a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram size={24} /></a>
							<a href="#" className="hover:text-pink-400 transition-colors"><FaFacebookF size={24} /></a>
							<a href="#" className="hover:text-pink-400 transition-colors"><FaYoutube size={24} /></a>
							<a href="#" className="hover:text-pink-400 transition-colors"><FaTiktok size={24} /></a>
						</div>
					</div>
					<div className="md:col-span-2 grid sm:grid-cols-2 gap-10">
						<div>
							<h3 className="font-bold text-xl mb-4">Contact Us</h3>
							<p className="text-gray-300">+6281211603309</p>
							<p className="text-gray-300">info@colorofindonesia.com</p>
						</div>
						<div>
							<h3 className="font-bold text-xl mb-4">Subscribe Newsletter</h3>
							<form className="flex">
								<input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500" />
								<button type="submit" className="bg-brand-pink hover:bg-pink-700 px-6 py-2 rounded-r-md font-bold transition-colors">
									Subscribe
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
					<p>COI Management © 2025</p>
				</div>
			</div>
		</footer>
	);
};
export default Footer;