import React, { useState } from 'react';
import Books from './components/Books';
import Authors from './components/Authors';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('books');

  const pageVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6">
      <nav className="flex gap-3 mb-6">
        <button
          onClick={() => setCurrentView('books')}
          className={`px-4 py-2 rounded-xl font-semibold ${currentView === 'books' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-slate-700'}`}>
          Книги
        </button>
        <button
          onClick={() => setCurrentView('authors')}
          className={`px-4 py-2 rounded-xl font-semibold ${currentView === 'authors' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-slate-700'}`}>
          Авторы
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial="enter"
          animate="center"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.28 }}>
          {currentView === 'books' ? <Books /> : <Authors />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
