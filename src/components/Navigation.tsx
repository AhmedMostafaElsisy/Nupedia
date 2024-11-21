import React, { useState } from 'react';
import { BookOpen, Search, Home, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onHomeClick: () => void;
  onSearch: (query: string) => void;
  onRequestClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onHomeClick, onSearch, onRequestClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={onHomeClick}
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-serif font-bold">Nupedia</span>
          </motion.div>

          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-300 ${
                  isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
              <motion.input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                whileFocus={{ scale: 1.02 }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Search Nupedia"
              />
            </form>
          </div>

          <nav className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onHomeClick}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Home"
            >
              <Home className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRequestClick}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Request Article"
            >
              <PenTool className="h-5 w-5" />
            </motion.button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;