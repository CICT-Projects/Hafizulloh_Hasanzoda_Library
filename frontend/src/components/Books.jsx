import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    try { const response = await axios.get('http://localhost:5000/api/books'); setBooks(response.data || []); }
    catch (error) { console.error('Error fetching books:', error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId != null) {
        const payload = { id: editId, title, publicationYear: parseInt(publicationYear) };
        await axios.put(`http://localhost:5000/api/books/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/books', { title, publicationYear: parseInt(publicationYear) });
      }
      setTitle(''); setPublicationYear(''); fetchBooks();
    } catch (error) { console.error('Error saving book:', error); }
  };

  const deleteBook = async (id) => {
    if (!confirm('Удалить книгу?')) return;
    try { await axios.delete(`http://localhost:5000/api/books/${id}`); fetchBooks(); }
    catch (error) { console.error('Error deleting book:', error); }
  };

  const handleEdit = (item) => {
    const id = item.id ?? item.Id;
    setEditId(id);
    setTitle(item.title ?? item.Title ?? '');
    setPublicationYear(item.publicationYear ?? item.PublicationYear ?? '');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }} className="max-w-5xl mx-auto">
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Книги</h2>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <input type="number" placeholder="Год публикации" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required className="w-44 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="bg-brand-500 text-white rounded-xl px-4 py-2 font-medium">{editId != null ? 'Сохранить изменения' : 'Добавить'}</motion.button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="text-left text-sm text-slate-600">
                <th className="px-4 py-2">Название</th>
                <th className="px-4 py-2">Год</th>
                <th className="px-4 py-2">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {books.map((book) => (
                <motion.tr key={book.id} whileHover={{ scale: 1 }} className="hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">{book.title}</td>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">{book.publicationYear}</td>
                  <td className="px-4 py-3 text-sm border-t border-gray-100">
                    <div className="inline-flex gap-2">
                      <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(book)} className="inline-flex items-center gap-2 bg-brand-500 text-white px-3 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10-10-4-4L4 16v4z"/></svg>
                        Edit
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => deleteBook(book.id ?? book.Id)} className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Удалить
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">Нет книг</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Books;