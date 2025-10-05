import React from 'react';
import type { NormalizedPrompt } from '../types';
import { getRatingOptions } from '../utils/rating';

interface PromptCardProps {
  prompt: NormalizedPrompt;
  onUpdateRating: (id: string, newRating: number) => void;
  onDelete: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onUpdateRating, onDelete }) => {
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRating = parseFloat(e.target.value);
    onUpdateRating(prompt?.id || '', newRating);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      onDelete(prompt?.id || '');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg capitalize font-semibold text-gray-900">{prompt?.title || 'Untitled'}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>

      <p className="text-gray-600 mb-4 flex-grow">{prompt?.description || 'No description available'}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {prompt?.category || 'Uncategorized'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(prompt?.rating || 0)}
            <span className="text-sm text-gray-600 ml-1">({prompt?.rating || 0})</span>
          </div>
          <select
            value={prompt?.rating || 0}
            onChange={handleRatingChange}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {getRatingOptions().map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
