import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen } from 'react-icons/fa';

const MainEventManagement = () => {
    const [imagePreview, setImagePreview] = useState(null);

    // Data dummy sesuai skema MainEvent Anda
    const [mainEvents, setMainEvents] = useState([
        {
            id: 1,
            title: 'Indonesia International Culture Festival 2025',
            slug: 'indonesia-international-culture-festival-2025',
            description: 'Sebuah perayaan akbar warisan budaya Indonesia yang kaya, menampilkan musik tradisional, pertunjukan tari, pameran seni, dan pengalaman kuliner.',
            location_name: 'Taman Mini Indonesia Indah',
            address: 'Jl. Raya Taman Mini, Jakarta Timur, DKI Jakarta',
            hero_image_url: 'https://via.placeholder.com/300x200?text=IICF+2025',
        },
        {
            id: 2,
            title: 'Bali International Folklore Festival 2025',
            slug: 'bali-international-folklore-festival-2025',
            description: 'Panggung luar biasa dari cerita rakyat tradisional dari seluruh dunia, yang diselenggarakan di pulau Bali yang indah.',
            location_name: 'Garuda Wisnu Kencana (GWK)',
            address: 'Jl. Raya Uluwatu, Ungasan, Kuta Sel., Kabupaten Badung, Bali',
            hero_image_url: 'https://via.placeholder.com/300x200?text=BIFF+2025',
        },
    ]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-8">
            {/* Form Input */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah / Edit Main Event</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="event-title" className="block text-sm font-medium text-gray-600 mb-1">Judul Event</label>
                            <input type="text" id="event-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="event-slug" className="block text-sm font-medium text-gray-600 mb-1">Slug (untuk URL)</label>
                            <input type="text" id="event-slug" placeholder="contoh-nama-event-2025" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="event-description" className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
                        <textarea id="event-description" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="event-location" className="block text-sm font-medium text-gray-600 mb-1">Nama Lokasi</label>
                            <input type="text" id="event-location" placeholder="Contoh: Taman Mini Indonesia Indah" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="event-address" className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
                            <input type="text" id="event-address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gambar Hero</label>
                        <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Simpan Event</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Main Event */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Main Event</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {mainEvents.map(event => (
                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-md border border-gray-200">
                           <img src={event.hero_image_url} alt={event.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{event.title}</h4>
                                <p className="text-sm text-gray-500">{event.location_name}</p>
                                <p className="text-xs text-gray-400 mt-1">Slug: {event.slug}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash size={14} /></button>
                                <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainEventManagement;