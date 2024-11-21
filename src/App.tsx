import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ArticleView from './components/ArticleView';
import ArticleEditor from './components/ArticleEditor';
import HomeView from './components/HomeView';
import RequestArticle from './components/RequestArticle';

const DEFAULT_CONTENT = `Welcome to Nupedia, a modern take on the classic wiki experience.

Nupedia is a collaborative platform where knowledge meets elegant design. Our mission is to provide a clean, intuitive interface for sharing and accessing information.

This platform features a responsive design that works seamlessly across all devices, from desktop computers to mobile phones. Users can easily create, edit, and browse articles with our modern toolset.

The interface takes inspiration from classic wiki platforms while incorporating modern design principles and interactions. We believe that knowledge should be both accessible and beautifully presented.

Key features of Nupedia include real-time previews, a sophisticated editor, and an intuitive navigation system. Whether you're a casual reader or a dedicated contributor, Nupedia provides the tools you need.`;

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Welcome to Nupedia');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'request'>('home');
  const [searchHistory, setSearchHistory] = useState([
    'Ancient Rome',
    'Quantum Physics',
    'Renaissance Art',
    'Machine Learning'
  ]);
  const [requests, setRequests] = useState<Array<{title: string; description: string}>>([]);

  const handleSave = (newTitle: string, newContent: string) => {
    setTitle(newTitle);
    setContent(newContent);
    setIsEditing(false);
    setCurrentView('article');
    if (!searchHistory.includes(newTitle)) {
      setSearchHistory(prev => [newTitle, ...prev].slice(0, 10));
    }
  };

  const handleSearch = (query: string) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, 10));
    }
  };

  const handleRequest = (title: string, description: string) => {
    setRequests(prev => [...prev, { title, description }]);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onHomeClick={() => setCurrentView('home')}
        onSearch={handleSearch}
        onRequestClick={() => setCurrentView('request')}
      />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {currentView === 'home' ? (
          <HomeView 
            searchHistory={searchHistory}
            requests={requests}
            onArticleSelect={(title) => {
              setTitle(title);
              setCurrentView('article');
            }}
          />
        ) : currentView === 'request' ? (
          <RequestArticle onSubmit={handleRequest} />
        ) : (
          isEditing ? (
            <ArticleEditor
              initialTitle={title}
              initialContent={content}
              onSave={handleSave}
              onPreview={() => setIsEditing(false)}
            />
          ) : (
            <ArticleView
              title={title}
              content={content}
              onEdit={() => setIsEditing(true)}
            />
          )
        )}
      </main>
    </div>
  );
}

export default App;