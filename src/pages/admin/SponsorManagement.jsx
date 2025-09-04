import React, { useState, useEffect } from 'react';
import { FaUpload, FaTrash, FaPen, FaLink } from 'react-icons/fa';
import useApi from '../../hooks/useApi';
import SponsorEditModal from '../../components/admin/sponsor/SponsorEditModal';
import SponsorBannerEditModal from '../../components/admin/sponsor/SponsorBannerEditModal';

const SponsorManagement = () => {
    // States for Sponsors
    const [sponsors, setSponsors] = useState([]);
    const [newSponsorData, setNewSponsorData] = useState({ name: '', website_url: '' });
    const [sponsorLogoFile, setSponsorLogoFile] = useState(null);
    const [sponsorLogoPreview, setSponsorLogoPreview] = useState(null);

    // States for Banner Sponsors
    const [bannerSponsors, setBannerSponsors] = useState([]);
    const [newBannerData, setNewBannerData] = useState({ name: '', link_url: '' });
    const [bannerImageFile, setBannerImageFile] = useState(null);
    const [bannerImagePreview, setBannerImagePreview] = useState(null);

    // Shared states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal states
    const [editingItem, setEditingItem] = useState(null);
    const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    
    const api = useApi();

    // --- Data Fetching ---
    const fetchData = async () => {
        try {
            setLoading(true);
            const [sponsorsRes, bannersRes] = await Promise.all([
                api.get('/home/sponsors'),
                api.get('/home/sponsor-banners')
            ]);
            setSponsors(sponsorsRes.data);
            setBannerSponsors(bannersRes.data);
        } catch (err) {
            setError('Gagal memuat data sponsor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Handlers for SPONSORS ---
    const handleSponsorChange = (e) => setNewSponsorData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSponsorLogoChange = (e) => {
        const file = e.target.files[0];
        if(file) { setSponsorLogoFile(file); setSponsorLogoPreview(URL.createObjectURL(file)); }
    };
    const handleSponsorSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newSponsorData.name);
        formData.append('website_url', newSponsorData.website_url);
        formData.append('is_published', true);
        if (sponsorLogoFile) formData.append('logo_url', sponsorLogoFile);

        setLoading(true);
        try {
            await api.post('/home/sponsors', formData);
            alert('Sponsor berhasil ditambahkan.');
            e.target.reset();
            setSponsorLogoPreview(null);
            await fetchData();
        } catch (err) { setError('Gagal menambahkan sponsor.'); } finally { setLoading(false); }
    };
    const handleSponsorUpdate = async (id, data, file) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('website_url', data.website_url);
        if (file) formData.append('logo_url', file);
        
        setLoading(true);
        try {
            await api.put(`/home/sponsors/${id}`, formData);
            alert('Sponsor berhasil diperbarui.');
            setIsSponsorModalOpen(false);
            await fetchData();
        } catch (err) { setError('Gagal memperbarui sponsor.'); } finally { setLoading(false); }
    };
    const handleSponsorDelete = async (id) => {
        if(window.confirm('Hapus sponsor ini?')) {
            setLoading(true);
            try {
                await api.delete(`/home/sponsors/${id}`);
                alert('Sponsor berhasil dihapus.');
                await fetchData();
            } catch (err) { setError('Gagal menghapus sponsor.'); } finally { setLoading(false); }
        }
    };


    // --- Handlers for BANNER SPONSORS ---
    const handleBannerChange = (e) => setNewBannerData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        if(file) { setBannerImageFile(file); setBannerImagePreview(URL.createObjectURL(file)); }
    };
     const handleBannerSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newBannerData.name);
        formData.append('link_url', newBannerData.link_url);
        formData.append('is_published', true);
        if (bannerImageFile) formData.append('image_url', bannerImageFile);

        setLoading(true);
        try {
            await api.post('/home/sponsor-banners', formData);
            alert('Banner berhasil ditambahkan.');
            e.target.reset();
            setBannerImagePreview(null);
            await fetchData();
        } catch (err) { setError('Gagal menambahkan banner.'); } finally { setLoading(false); }
    };
    const handleBannerUpdate = async (id, data, file) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('link_url', data.link_url);
        if (file) formData.append('image_url', file);

        setLoading(true);
        try {
            await api.put(`/home/sponsor-banners/${id}`, formData);
            alert('Banner berhasil diperbarui.');
            setIsBannerModalOpen(false);
            await fetchData();
        } catch (err) { setError('Gagal memperbarui banner.'); } finally { setLoading(false); }
    };
    const handleBannerDelete = async (id) => {
         if(window.confirm('Hapus banner ini?')) {
            setLoading(true);
            try {
                await api.delete(`/home/sponsor-banners/${id}`);
                alert('Banner berhasil dihapus.');
                await fetchData();
            } catch (err) { setError('Gagal menghapus banner.'); } finally { setLoading(false); }
        }
    };
    

    if (loading && sponsors.length === 0 && bannerSponsors.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            {/* SPONSOR SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah Sponsor</h2>
                    <form onSubmit={handleSponsorSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Nama Sponsor</label>
                            <input type="text" name="name" onChange={handleSponsorChange} placeholder="Contoh: PT Jaya Abadi" className="w-full mt-1 border rounded-lg p-2" required/>
                        </div>
                        <div>
                            <label htmlFor="website_url" className="block text-sm font-medium">Link Sponsor (URL)</label>
                            <div className="relative">
                                <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                <input type="url" name="website_url" onChange={handleSponsorChange} placeholder="https://contoh.com" className="w-full mt-1 pl-10 p-2 border rounded-lg"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Logo Sponsor</label>
                            <div className="w-full h-40 mt-1 border-2 border-dashed rounded-lg flex items-center justify-center">
                                {sponsorLogoPreview ? <img src={sponsorLogoPreview} alt="Logo Preview" className="h-full object-contain p-2" /> : <span className="text-gray-400">Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleSponsorLogoChange} className="mt-2 bblock w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer" required/>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg disabled:bg-purple-300">
                                <FaUpload /><span>{loading ? 'Menyimpan...' : 'Simpan Sponsor'}</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Daftar Sponsor</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {sponsors.map(sponsor => (
                            <div key={sponsor.id} className="grid grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                                <div className="col-span-2 flex items-center gap-4">
                                    <img src={`http://localhost:4000${sponsor.logo_url}`} alt={sponsor.name} className="h-10 object-contain"/>
                                    <span className="font-semibold">{sponsor.name}</span>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <button onClick={() => handleSponsorDelete(sponsor.id)} className="p-2 bg-red-500 text-white rounded-md"><FaTrash /></button>
                                    <button onClick={() => { setEditingItem(sponsor); setIsSponsorModalOpen(true); }} className="p-2 bg-yellow-500 text-white rounded-md"><FaPen /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BANNER SPONSOR SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah Banner Sponsor</h2>
                    <form onSubmit={handleBannerSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Sponsor Banner</label>
                            <input type="text" name="name" onChange={handleBannerChange} placeholder="Contoh: PT Jaya Abadi" className="w-full mt-1 border rounded-lg p-2" required/>
                        </div>
                         <div>
                            <label htmlFor="link_url" className="block text-sm font-medium">Link Banner (URL)</label>
                            <div className="relative">
                                <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                <input type="url" name="link_url" onChange={handleBannerChange} placeholder="https://contoh.com" className="w-full mt-1 pl-10 p-2 border rounded-lg"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Gambar Banner</label>
                            <div className="w-full h-40 mt-1 border-2 border-dashed rounded-lg flex items-center justify-center">
                                {bannerImagePreview ? <img src={bannerImagePreview} alt="Banner Preview" className="h-full object-contain p-2" /> : <span className="text-gray-400">Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleBannerImageChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer" required/>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" disabled={loading} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg disabled:bg-purple-300">
                                <FaUpload /><span>{loading ? 'Menyimpan...' : 'Simpan Banner'}</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Daftar Banner Sponsor</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {bannerSponsors.map(banner => (
                           <div key={banner.id} className="grid grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                                <div className="col-span-2 flex items-center gap-4">
                                    <img src={`http://localhost:4000${banner.image_url}`} alt={`Banner ${banner.id}`} className="h-10 object-contain"/>
                                    <span className="font-semibold">{banner.name}</span>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <button onClick={() => handleBannerDelete(banner.id)} className="p-2 bg-red-500 text-white rounded-md"><FaTrash /></button>
                                    <button onClick={() => { setEditingItem(banner); setIsBannerModalOpen(true); }} className="p-2 bg-yellow-500 text-white rounded-md"><FaPen /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SponsorEditModal isOpen={isSponsorModalOpen} onClose={() => setIsSponsorModalOpen(false)} item={editingItem} onSave={handleSponsorUpdate} />
            <SponsorBannerEditModal isOpen={isBannerModalOpen} onClose={() => setIsBannerModalOpen(false)} item={editingItem} onSave={handleBannerUpdate} />
        </div>
    );
};

export default SponsorManagement;
