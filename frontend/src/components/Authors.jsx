
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => { fetchAuthors(); }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/authors');
      setAuthors(response.data || []);
    } catch (error) { console.error('Error fetching authors:', error); }
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/authors', { name, country });
      setName(''); setCountry(''); fetchAuthors();
    } catch (error) { console.error('Error adding author:', error); }
  };

  const deleteAuthor = async (id) => {
    if (!confirm('Удалить автора?')) return;
    try { await axios.delete(`http://localhost:5000/api/authors/${id}`); fetchAuthors(); }
    catch (error) { console.error('Error deleting author:', error); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }} className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Авторы</h2>

        <form onSubmit={addAuthor} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="text"
            placeholder="Страна"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-48 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="bg-brand-500 text-white rounded-xl px-4 py-2 font-medium">Добавить</motion.button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-sm text-slate-600">
                <th className="px-4 py-2">Имя</th>
                <th className="px-4 py-2">Страна</th>
                <th className="px-4 py-2">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {authors.map((author) => (
                <motion.tr key={author.id} whileHover={{ scale: 1 }} className="hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">{author.name}</td>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">{author.country}</td>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => deleteAuthor(author.id)} className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      Удалить
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
              {authors.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">Нет авторов</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Authors;