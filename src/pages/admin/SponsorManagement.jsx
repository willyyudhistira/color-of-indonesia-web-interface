import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaLink } from 'react-icons/fa';

const SponsorManagement = () => {
    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [sponsors, setSponsors] = useState([
        { id: 1, name: 'Sponsor Utama Jaya', logoUrl: 'https://via.placeholder.com/150x50?text=Logo+A' },
        { id: 2, name: 'PT Sejahtera Bersama', logoUrl: 'https://via.placeholder.com/150x50?text=Logo+B' },
    ]);

    const [bannerSponsors, setBannerSponsors] = useState([
        { id: 1, name: 'Sponsor Jaya', logoUrl: 'https://via.placeholder.com/300x100?text=Banner+A' },
        { id: 2, name: 'PT Bersama', logoUrl: 'https://via.placeholder.com/300x100?text=Banner+B' },
    ]);

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) setBannerPreview(URL.createObjectURL(file));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) setLogoPreview(URL.createObjectURL(file));
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah Sponsor</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="sponsor-name" className="block text-sm font-medium text-gray-600 mb-1">Nama Sponsor</label>
                            <input type="text" id="sponsor-name" placeholder="Contoh: PT Jaya Abadi" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="sponsor-link" className="block text-sm font-medium text-gray-600 mb-1">Link Sponsor (URL)</label>
                            <div className="relative">
                                <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                <input type="url" id="sponsor-link" placeholder="https://contoh.com" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Logo Sponsor</label>
                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleLogoChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                                <FaUpload />
                                <span>Simpan Sponsor</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Daftar Sponsor */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Daftar Sponsor</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {sponsors.map(sponsor => (
                            <div key={sponsor.id} className="grid grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                                <div className="col-span-2 flex items-center gap-4">
                                    <img src={sponsor.logoUrl} alt={sponsor.name} className="h-10 object-contain"/>
                                    <span className="font-semibold text-gray-600">{sponsor.name}</span>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                    <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah Banner Sponsor</h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="sponsor-name" className="block text-sm font-medium text-gray-600 mb-1">Nama Sponsor</label>
                            <input type="text" id="sponsor-name" placeholder="Contoh: PT Jaya Abadi" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="sponsor-link" className="block text-sm font-medium text-gray-600 mb-1">Link Sponsor (URL)</label>
                            <div className="relative">
                                <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                <input type="url" id="sponsor-link" placeholder="https://contoh.com" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Logo Sponsor</label>
                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleLogoChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                                <FaUpload />
                                <span>Simpan Sponsor</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Kolom Kanan: Daftar Sponsor */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Daftar Banner Sponsor</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {bannerSponsors.map(sponsor => (
                            <div key={sponsor.id} className="grid grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                                <div className="col-span-2 flex items-center gap-4">
                                    <img src={sponsor.logoUrl} alt={sponsor.name} className="h-10 object-contain"/>
                                    <span className="font-semibold text-gray-600">{sponsor.name}</span>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                    <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SponsorManagement;