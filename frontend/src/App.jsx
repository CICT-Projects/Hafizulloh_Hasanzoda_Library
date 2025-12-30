import React, { useState } from 'react';
import Books from './components/Books';
import Authors from './components/Authors';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('books');

  return (
    <div className="App">
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <button onClick={() => setCurrentView('books')} style={{ marginRight: '10px', padding: '10px' }}>Книги</button>
        <button onClick={() => setCurrentView('authors')} style={{ padding: '10px' }}>Авторы</button>
      </nav>
      {currentView === 'books' ? <Books /> : <Authors />}
    </div>
  );
}

export default App;
