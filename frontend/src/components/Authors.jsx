
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/authors', {
        name,
        country
      });
      setName('');
      setCountry('');
      fetchAuthors();
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Авторы</h2>
      <form onSubmit={addAuthor} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Страна"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>Добавить</button>
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Имя</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Страна</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{author.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{author.country}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => deleteAuthor(author.id)} style={{ padding: '5px 10px' }}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;