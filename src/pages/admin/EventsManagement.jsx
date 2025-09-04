import React, { useState, useEffect, useCallback } from 'react';
import { FaUpload, FaTrash, FaPen, FaTimes } from 'react-icons/fa';
import useApi from '../../hooks/useApi'; // Pastikan path ini benar
import slugify from '../../hooks/slugify';

// Helper untuk memformat tanggal dari ISO string ke format YYYY-MM-DD untuk input
const formatDateForInput = (date) => {
    if (!date) return '';
    // Menggunakan toISOString dan memotong 10 karakter pertama (YYYY-MM-DD)
    return new Date(date).toISOString().split('T')[0];
};

const EventsManagement = () => {
    // State untuk data dari API
    const [events, setEvents] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);     // untuk GET daftar
    const [isSubmitting, setIsSubmitting] = useState(false); // untuk POST/PUT
    const [error, setError] = useState(null);

    // State untuk form (bisa mode Add atau Edit)
    const initialFormState = {
        title: '', slug: '', description: '', start_date: '', end_date: '',
        location_name: '', address: '', form_url: '',
        is_featured: false, is_published: true,
    };
    const [formData, setFormData] = useState(initialFormState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // State untuk menentukan mode form: null = Add, ID = Edit
    const [editingId, setEditingId] = useState(null);

    const api = useApi();

    const fetchEvents = useCallback(async (page = currentPage) => {
    try {
        setIsFetching(true);
        const res = await api.get(`/admin/events?page=${page}`);
        setEvents(res.data.data);
        setPagination({ totalPages: res.data.totalPages, page: res.data.page });
    } catch (err) {
        setError('Gagal memuat data event.');
    } finally {
        setIsFetching(false);
    }
    }, [api, currentPage]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newForm = { ...prev, [name]: newValue };
            if (name === 'title' && !editingId) { // Slug hanya auto-generate saat membuat baru
                newForm.slug = slugify(value);
            }
            return newForm;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearForm = () => {
        setFormData(initialFormState);
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
            slug: event.slug,
            description: event.description || '',
            start_date: event.start_date,
            end_date: event.end_date,
            location_name: event.location_name || '',
            address: event.address || '',
            form_url: event.form_url || '',
            is_featured: event.is_featured,
            is_published: event.is_published,
        });
        setImagePreview(event.hero_image_url ? `http://localhost:4000${event.hero_image_url}` : null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        Object.keys(formData).forEach((k) => formPayload.append(k, formData[k]));
        if (selectedFile) formPayload.append('hero_image_url', selectedFile);

        setIsSubmitting(true);
        setError(null);
        try {
            if (editingId) {
            await api.put(`/admin/events/${editingId}`, formPayload);
            alert('Event berhasil diperbarui!');
            } else {
            await api.post('/admin/events', formPayload);
            alert('Event berhasil ditambahkan!');
            }
            handleClearForm();
            await fetchEvents(); // ini hanya flip isFetching
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.');
        } finally {
            setIsSubmitting(false);
        }
    };

  const handleDelete = async (id) => {
    if (!window.confirm('Anda yakin ingin menghapus event ini?')) return;
    setIsFetching(true);
    setError(null);
    try {
      await api.delete(`/admin/events/${id}`);
      alert('Event berhasil dihapus.');
      if (events.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        await fetchEvents();
      }
    } catch (err) {
      setError('Gagal menghapus event.');
    } finally {
      setIsFetching(false);
    }
  };
    
    if (isFetching && events.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                     <h2 className="text-xl font-bold text-gray-700">{editingId ? 'Edit Event' : 'Tambah Event Baru'}</h2>
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
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-600 mb-1">Slug (URL)</label>
                            <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="Dibuat otomatis dari judul" className="w-full px-4 py-2 border rounded-lg bg-gray-100" readOnly={!editingId} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
                        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-600 mb-1">Tanggal Mulai</label>
                            <input type="date" id="start_date" name="start_date" value={formatDateForInput(formData.start_date)} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required/>
                        </div>
                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-600 mb-1">Tanggal Selesai</label>
                            <input type="date" id="end_date" name="end_date" value={formatDateForInput(formData.end_date)} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="location_name" className="block text-sm font-medium text-gray-600 mb-1">Nama Lokasi</label>
                            <input type="text" id="location_name" name="location_name" value={formData.location_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Alamat</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="form_url" className="block text-sm font-medium text-gray-600 mb-1">URL Form Pendaftaran</label>
                        <input type="url" id="form_url" name="form_url" value={formData.form_url} onChange={handleInputChange} placeholder="https://..." className="w-full px-4 py-2 border rounded-lg" required/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Gambar Hero</label>
                        <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                            {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                        </div>
                        <input id="hero_image_url" type="file" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer"/>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_featured" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} className="h-4 w-4 rounded"/>
                                <label htmlFor="is_featured" className="text-sm font-medium">Featured (Home)</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleInputChange} className="h-4 w-4 rounded"/>
                                <label htmlFor="is_published" className="text-sm font-medium">Published</label>
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 disabled:bg-purple-400">
                            <FaUpload />
                            <span>{isSubmitting ? 'Menyimpan...' : (editingId ? 'Update Event' : 'Simpan Event')}</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Event</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {events.map(event => (
                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-md border">
                           <img src={`http://localhost:4000${event.hero_image_url}`} alt={event.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200" />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    {event.is_published && <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">Published</span>}
                                    {event.is_featured && <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-0.5 rounded-full">Featured</span>}
                                </div>
                                <h4 className="font-bold text-gray-800">{event.title}</h4>
                                <p className="text-sm text-gray-500">{event.location_name}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {formatDateForInput(event.start_date)}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-500 text-white rounded-md" title="Hapus"><FaTrash size={14} /></button>
                                <button onClick={() => handleEditClick(event)} className="p-2 bg-yellow-500 text-white rounded-md" title="Perbarui"><FaPen size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="flex justify-center items-center space-x-2 mt-8">
                    {Array.from({ length: pagination.totalPages || 1 }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-full font-bold ${pagination.page === page ? 'bg-brand-purple text-white' : 'bg-gray-200 hover:bg-purple-100'}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsManagement;
