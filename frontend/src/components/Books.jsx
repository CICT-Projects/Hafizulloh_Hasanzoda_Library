import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [publicationYear, setPublicationYear] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', {
        title,
        publicationYear: parseInt(publicationYear)
      });
      setTitle('');
      setPublicationYear('');
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Книги</h2>
      <form onSubmit={addBook} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Год публикации"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>Добавить</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Название</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Год</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{book.publicationYear}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => deleteBook(book.id)} style={{ padding: '5px 10px' }}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;