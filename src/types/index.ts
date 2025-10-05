export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number; // Raw rating from API
}

export interface NormalizedPrompt extends Omit<Prompt, 'rating'> {
  rating: number; // Normalized rating (0-5 with 0.5 steps)
}

export interface User {
  username: string;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
