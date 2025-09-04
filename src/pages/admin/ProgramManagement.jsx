import React, { useState, useEffect } from 'react';
import { FaUpload, FaTrash, FaPen, FaTimes, FaImage } from 'react-icons/fa';
import useApi from '../../hooks/useApi'; // Pastikan path ini benar

const ProgramManagement = () => {
    // State untuk data dari API
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk form (bisa mode Add atau Edit)
    const initialFormState = {
        title: '',
        subtitle: '',
        description: '',
        sort_order: 0,
        is_published: true,
    };
    const [formData, setFormData] = useState(initialFormState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);

    // State untuk menentukan mode form: null = Add, ID = Edit
    const [editingId, setEditingId] = useState(null);

    const api = useApi();

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/programs');
            setPrograms(response.data.sort((a, b) => a.sort_order - b.sort_order));
        } catch (err) {
            setError('Gagal memuat data program.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setIconPreview(URL.createObjectURL(file));
        }
    };

    const handleClearForm = () => {
        setFormData(initialFormState);
        setSelectedFile(null);
        setIconPreview(null);
        setEditingId(null);
        if (document.getElementById('icon_url')) {
            document.getElementById('icon_url').value = null;
        }
    };

    const handleEditClick = (program) => {
        setEditingId(program.id);
        setFormData({
            title: program.title,
            subtitle: program.subtitle || '',
            description: program.description,
            sort_order: program.sort_order,
            is_published: program.is_published,
        });
        setIconPreview(program.icon_url ? `http://localhost:4000${program.icon_url}` : null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formPayload = new FormData();
        Object.keys(formData).forEach(key => formPayload.append(key, formData[key]));
        if (selectedFile) {
            formPayload.append('icon_url', selectedFile);
        }
        
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                await api.put(`/admin/programs/${editingId}`, formPayload);
                alert('Program berhasil diperbarui!');
            } else {
                await api.post('/admin/programs', formPayload);
                alert('Program berhasil ditambahkan!');
            }
            handleClearForm();
            await fetchPrograms();
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Anda yakin ingin menghapus program ini?')) {
            setLoading(true);
            setError(null);
            try {
                await api.delete(`/admin/programs/${id}`);
                alert('Program berhasil dihapus.');
                await fetchPrograms();
            } catch (err) {
                setError('Gagal menghapus program.');
            } finally {
                setLoading(false);
            }
        }
    };
    
    if (loading && programs.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-8">
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-700">{editingId ? 'Edit Program' : 'Tambah Program Baru'}</h2>
                    {editingId && (
                        <button onClick={handleClearForm} className="flex items-center gap-2 text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-300">
                            <FaTimes /> Batal Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Judul Program</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required />
                        </div>
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-600 mb-1">Subtitle (Opsional)</label>
                            <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
                        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Ikon Program</label>
                            <div className="w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                                {iconPreview ? <img src={iconPreview} alt="Preview" className="w-16 h-16 object-contain" /> : <span className="text-gray-400">Icon Preview</span>}
                            </div>
                            <input id="icon_url" type="file" accept="image/*,.svg" onChange={handleFileChange} className="mt-2 block w-full text-sm"/>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-600 mb-1">Urutan</label>
                                <input type="number" id="sort_order" name="sort_order" value={formData.sort_order} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="is_published" name="is_published" checked={formData.is_published} onChange={handleInputChange} className="h-4 w-4 rounded"/>
                                <label htmlFor="is_published" className="text-sm font-medium">Publikasikan</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 disabled:bg-purple-400">
                            <FaUpload />
                            <span>{loading ? 'Menyimpan...' : (editingId ? 'Update Program' : 'Simpan Program')}</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Program</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {programs.map(program => (
                        <div key={program.id} className="flex items-start gap-4 p-3 rounded-md border">
                           <div className="w-12 h-12 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center">
                                {program.icon_url ? (
                                    <img src={`http://localhost:4000${program.icon_url}`} alt={program.title} className="w-8 h-8 object-contain" />
                                ) : (
                                    <FaImage className="text-purple-400" size={24} />
                                )}
                           </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{program.title}</h4>
                                <p className="text-sm font-semibold text-gray-600">{program.subtitle}</p>
                                <p className="text-sm text-gray-500 mt-1">{program.description.substring(0,100)}...</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${program.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                                    {program.is_published ? 'Published' : 'Draft'}
                                </span>
                                <button onClick={() => handleEditClick(program)} className="p-2 bg-yellow-500 text-white rounded-md" title="Perbarui"><FaPen size={14} /></button>
                                <button onClick={() => handleDelete(program.id)} className="p-2 bg-red-500 text-white rounded-md" title="Hapus"><FaTrash size={14} /></button>
                            </div>
                        </div>
                    ))}
                    {programs.length === 0 && !loading && <p className="text-center text-gray-500">Belum ada program yang ditambahkan.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProgramManagement;
