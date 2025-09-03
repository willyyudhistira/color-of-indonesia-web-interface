import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaLink } from 'react-icons/fa';

const SponsorManagement = () => {
    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    // Data dummy untuk daftar sponsor yang sudah ada
    const [sponsors, setSponsors] = useState([
        { id: 1, name: 'Sponsor Utama Jaya', logoUrl: 'https://via.placeholder.com/150x50?text=Logo+A' },
        { id: 2, name: 'PT Sejahtera Bersama', logoUrl: 'https://via.placeholder.com/150x50?text=Logo+B' },
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
            {/* Form untuk Menambah Sponsor Baru */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Tambah Sponsor Baru</h2>
                <form className="space-y-6">
                    {/* Input Nama dan Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    {/* Input Banner dan Logo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upload Banner */}
                        
                        {/* Upload Logo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Logo Sponsor</label>
                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleLogoChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                    </div>
                </form>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md'>
                <form className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label htmlFor="sponsor-link" className="block text-sm font-medium text-gray-600 mb-1">Link Sponsor (URL)</label>
                            <div className="relative">
                                <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                <input type="url" id="sponsor-link" placeholder="https://contoh.com" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Banner Sponsor (720x300 px)</label>
                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {bannerPreview ? <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleBannerChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Simpan Sponsor</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Sponsor yang Sudah Ada */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Daftar Sponsor</h3>
                <div className="space-y-3">
                    {sponsors.map(sponsor => (
                        <div key={sponsor.id} className="grid grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <img src={sponsor.logoUrl} alt={sponsor.name} className="h-10 object-contain"/>
                                <span className="font-semibold text-gray-600">{sponsor.name}</span>
                            </div>
                            <div className="col-start-3 flex justify-end items-center gap-2">
                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SponsorManagement;