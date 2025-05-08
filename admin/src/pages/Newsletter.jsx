import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaTrash, FaSync } from 'react-icons/fa';

const Newsletter = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + '/api/newsletter/list', { headers: { token } });
      if (res.data.success) setList(res.data.list);
      else toast.error(res.data.message || 'Aboneler yüklenemedi');
    } catch (e) {
      toast.error('Aboneler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('E-posta girin');
    try {
      const res = await axios.post(backendUrl + '/api/newsletter/add', { email });
      if (res.data.success) {
        toast.success('Abone eklendi');
        setEmail("");
        fetchList();
      } else toast.error(res.data.message);
    } catch (e) {
      toast.error('Abone eklenemedi');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Aboneyi silmek istiyor musunuz?')) return;
    try {
      const res = await axios.post(backendUrl + '/api/newsletter/remove', { id }, { headers: { token } });
      if (res.data.success) {
        toast.success('Abone silindi');
        fetchList();
      } else toast.error(res.data.message);
    } catch (e) {
      toast.error('Abone silinemedi');
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h2 className='text-xl font-semibold mb-4'>Bülten Aboneleri</h2>
        <form onSubmit={handleAdd} className='flex gap-4 mb-6'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='px-3 py-2 border rounded w-64'
            placeholder='E-posta ekle'
            required
          />
          <button type='submit' className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'>Ekle</button>
          <button type='button' onClick={fetchList} className='flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors'>
            <FaSync className={loading ? 'animate-spin' : ''} size={14} /> Yenile
          </button>
        </form>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
          </div>
        ) : list.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border rounded'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b'>E-posta</th>
                  <th className='py-2 px-4 border-b'>Kayıt Tarihi</th>
                  <th className='py-2 px-4 border-b'></th>
                </tr>
              </thead>
              <tbody>
                {list.map(item => (
                  <tr key={item._id}>
                    <td className='py-2 px-4 border-b'>{item.email}</td>
                    <td className='py-2 px-4 border-b'>{new Date(item.date).toLocaleString()}</td>
                    <td className='py-2 px-4 border-b'>
                      <button onClick={() => handleDelete(item._id)} className='text-red-500 hover:text-red-700'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='text-center py-6 bg-gray-50 rounded-xl'>
            <p className='text-gray-600'>Henüz abone yok.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter; 