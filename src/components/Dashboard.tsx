import React, { useState, useEffect } from 'react';
import type { Prompt, NormalizedPrompt } from '../types';
import { ApiService } from '../services/api';
import { normalizeRating, denormalizeRating } from '../utils/rating';
import { useAuth } from '../contexts/AuthContext';
import PromptCard from './PromptCard';
import PromptForm from './PromptForm';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [prompts, setPrompts] = useState<NormalizedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getPrompts();
      
      // Normalize ratings and extract unique categories
      const normalizedPrompts = data.map(prompt => ({
        ...prompt,
        rating: normalizeRating(prompt.rating)
      }));
      
      setPrompts(normalizedPrompts);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrompt = async (promptData: Omit<Prompt, 'id'>) => {
    try {
      const newPrompt = await ApiService.createPrompt(promptData);
      const normalizedPrompt = {
        ...newPrompt,
        rating: normalizeRating(newPrompt.rating)
      };
      setPrompts(prev => [...prev, normalizedPrompt]);
      
      // Update categories if new
      if (!categories.includes(promptData.category)) {
        setCategories(prev => [...prev, promptData.category]);
      }
      
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create prompt');
    }
  };

  const handleUpdateRating = async (id: string, newRating: number) => {
    try {
      const rawRating = denormalizeRating(newRating);
      await ApiService.updatePrompt(id, { rating: rawRating });
      
      setPrompts(prev => 
        prev.map(prompt => 
          prompt.id === id ? { ...prompt, rating: newRating } : prompt
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update rating');
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      await ApiService.deletePrompt(id);
      setPrompts(prev => prev.filter(prompt => prompt.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete prompt');
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || prompt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading prompts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPrompts}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prompt Manager</h1>
              <p className="text-gray-600">Welcome back, {user?.username}!</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Prompt
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredPrompts.length} of {prompts.length} prompts
          </div>
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600">
              {searchTerm || categoryFilter 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first prompt!'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onUpdateRating={handleUpdateRating}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <PromptForm
          onSubmit={handleCreatePrompt}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
