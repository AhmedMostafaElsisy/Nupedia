import React, { useState } from 'react';
import { Edit2, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import TableOfContents from './TableOfContents';

interface ArticleViewProps {
  title: string;
  content: string;
  onEdit: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ title, content, onEdit }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sections = content.split('\n\n').filter(Boolean);

  return (
    <article className="max-w-4xl mx-auto bg-white p-8 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-serif mb-4">{title}</h1>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit2 size={18} />
          Edit
        </button>
      </div>
      
      <div className="flex gap-8 relative">
        <aside 
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } lg:block shrink-0 overflow-hidden`}
        >
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between text-gray-700 mb-4">
              <div className="flex items-center gap-2">
                <Menu size={20} />
                <h2 className="font-medium">Contents</h2>
              </div>
            </div>
            <TableOfContents sections={sections} />
          </div>
        </aside>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-0 top-0 -ml-4 h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <div className={`flex-1 prose prose-slate max-w-none transition-all duration-300 ${
          isSidebarOpen ? '' : 'ml-4'
        }`}>
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              <p>{section}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleView;