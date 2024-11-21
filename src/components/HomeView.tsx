import React from 'react';
import { Clock, Compass, TrendingUp, BookOpen, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeViewProps {
  searchHistory: string[];
  requests: Array<{title: string; description: string}>;
  onArticleSelect: (title: string) => void;
}

const RECOMMENDED_TOPICS = [
  {
    title: 'Artificial Intelligence',
    description: 'Explore the fundamentals of AI and machine learning',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'World History',
    description: 'Journey through significant historical events',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Science & Technology',
    description: 'Latest developments in science and tech',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const HomeView: React.FC<HomeViewProps> = ({ searchHistory, requests, onArticleSelect }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4">
      {/* Recent Searches */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-2xl font-serif font-medium">Recent Searches</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((search, index) => (
            <motion.button
              key={index}
              variants={item}
              onClick={() => onArticleSelect(search)}
              className="card p-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-lg font-medium text-gray-900">{search}</h3>
              <p className="text-sm text-gray-500 mt-1">Click to view article</p>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Article Requests */}
      {requests.length > 0 && (
        <motion.section
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-gray-500" />
            <h2 className="text-2xl font-serif font-medium">Requested Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request, index) => (
              <motion.div
                key={index}
                variants={item}
                className="card p-4 border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{request.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Recommended Topics */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="flex items-center gap-2 mb-6">
          <Compass className="h-5 w-5 text-gray-500" />
          <h2 className="text-2xl font-serif font-medium">Recommended Topics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECOMMENDED_TOPICS.map((topic, index) => (
            <motion.button
              key={index}
              variants={item}
              onClick={() => onArticleSelect(topic.title)}
              className="card overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <topic.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomeView;