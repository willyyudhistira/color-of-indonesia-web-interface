import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Buat instance axios untuk API Anda
const api = axios.create({
    baseURL: 'http://localhost:4000/api' // Sesuaikan jika base URL Anda berbeda
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true); // Untuk cek token saat pertama kali load
    const navigate = useNavigate();

    useEffect(() => {
        // Saat aplikasi dimuat, coba pulihkan sesi dari localStorage
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
            if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            }
        setLoading(false);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            const { token, user } = response.data;

            // Simpan token dan user data
            localStorage.setItem('authToken', token);
            localStorage.setItem('authUser', JSON.stringify(user));

            // Set header Authorization untuk semua request axios selanjutnya
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            setToken(token);
            setUser(user);
            
            navigate('/admin/dashboard');

        } catch (error) {
            // Lemparkan error agar bisa ditangkap di komponen
            throw new Error(error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
        }
    };

    const register = async (name, email, password) => {
        try {
            // Kita hanya butuh email dan password sesuai skema
            const response = await api.post('/auth/register', { email, password });
            return response.data; // Mengembalikan pesan sukses dari API
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registrasi gagal.');
        }
    };
    

    const logout = () => {
        // Hapus semua data sesi
        
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        
        // Hapus header Authorization dari axios
        delete api.defaults.headers.common['Authorization'];
        
        navigate('/');
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
    };

    // Tampilkan children hanya setelah selesai loading pengecekan token awal
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
    return useContext(AuthContext);
};