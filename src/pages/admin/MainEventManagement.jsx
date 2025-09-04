import React, { useEffect, useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaTimes } from 'react-icons/fa';
import useApi from '../../hooks/useApi';

const MainEventManagement = () => {
    // State untuk data dari API
    const [mainEvents, setMainEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk form (bisa mode Add atau Edit)
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '', // Menggantikan slug
        description: '',
        location_name: '',
        address: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // State untuk menentukan mode form: null = Add, ID = Edit
    const [editingId, setEditingId] = useState(null);

    const api = useApi();

    const fetchMainEvents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/home/main-events');
            setMainEvents(response.data);
        } catch (err) {
            setError('Gagal memuat data main event.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMainEvents();
    }, []);

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearForm = () => {
        setFormData({ title: '', subtitle: '', description: '', location_name: '', address: '' });
        setSelectedFile(null);
        setImagePreview(null);
        setEditingId(null);
        if(document.getElementById('hero_image_url')) {
            document.getElementById('hero_image_url').value = null;
        }
    };

    const handleEditClick = (event) => {
        setEditingId(event.id);
        setFormData({
            title: event.title,
            subtitle: event.subtitle,
            description: event.description,
            location_name: event.location_name,
            address: event.address,
        });
        setImagePreview(event.hero_image_url ? `http://localhost:4000${event.hero_image_url}` : null);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas untuk edit
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('subtitle', formData.subtitle);
        formPayload.append('description', formData.description);
        formPayload.append('location_name', formData.location_name);
        formPayload.append('address', formData.address);
        if (selectedFile) {
            formPayload.append('hero_image_url', selectedFile);
        }
        
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                // Mode UPDATE
                await api.put(`/home/main-events/${editingId}`, formPayload);
                alert('Main event berhasil diperbarui!');
            } else {
                // Mode CREATE
                await api.post('/home/main-events', formPayload);
                alert('Main event berhasil ditambahkan!');
            }
            handleClearForm();
            await fetchMainEvents();
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Anda yakin ingin menghapus main event ini?')) {
            setLoading(true);
            setError(null);
            try {
                await api.delete(`/admin/main-events/${id}`);
                alert('Main event berhasil dihapus.');
                await fetchMainEvents();
            } catch (err) {
                setError('Gagal menghapus main event.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading && mainEvents.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        {editingId ? `Edit Main Event` : 'Tambah Main Event Baru'}
                    </h2>
                    {editingId && (
                        <button onClick={handleClearForm} className="flex items-center gap-2 text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-300">
                            <FaTimes /> Batal Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Judul Event</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required/>
                        </div>
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-600 mb-1">Subtitle (Deskripsi Singkat)</label>
                            <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="contoh: Perayaan Budaya Terbesar 2025" className="w-full px-4 py-2 border rounded-lg" required/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Deskripsi Lengkap</label>
                        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="location_name" className="block text-sm font-medium text-gray-600 mb-1">Nama Lokasi</label>
                            <input type="text" id="location_name" name="location_name" value={formData.location_name} onChange={handleInputChange} placeholder="Contoh: Taman Mini Indonesia Indah" className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gambar Hero</label>
                        <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                            {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                        </div>
                        <input id="hero_image_url" type="file" accept="image/*" onChange={handleFileChange} className="mt-2 bblock w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer"/>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 disabled:bg-purple-400">
                            <FaUpload />
                            <span>{loading ? 'Menyimpan...' : (editingId ? 'Update Event' : 'Simpan Event')}</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Main Event</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {mainEvents.map(event => (
                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-md border">
                           <img src={`http://localhost:4000${event.hero_image_url}`} alt={event.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200" />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{event.title}</h4>
                                <p className="text-sm font-semibold text-purple-700">{event.subtitle}</p>
                                <p className="text-sm text-gray-500 mt-1">{event.location_name}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-500 text-white rounded-md" title="Hapus"><FaTrash size={14} /></button>
                                <button onClick={() => handleEditClick(event)} className="p-2 bg-yellow-500 text-white rounded-md" title="Perbarui"><FaPen size={14} /></button>
                            </div>
                        </div>
                    ))}
                     {mainEvents.length === 0 && !loading && <p className="text-center text-gray-500">Belum ada main event yang ditambahkan.</p>}
                </div>
            </div>
        </div>
    );
};

export default MainEventManagement;