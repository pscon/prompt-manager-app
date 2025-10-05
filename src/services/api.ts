import type { Prompt } from '../types';

const API_BASE_URL = 'https://68dedf2c898434f413564016.mockapi.io/api/v1';

export class ApiService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  static async getPrompts(): Promise<Prompt[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompts`);
      return this.handleResponse<Prompt[]>(response);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      throw new Error('Failed to fetch prompts');
    }
  }

  static async createPrompt(prompt: Omit<Prompt, 'id'>): Promise<Prompt> {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      return this.handleResponse<Prompt>(response);
    } catch (error) {
      console.error('Error creating prompt:', error);
      throw new Error('Failed to create prompt');
    }
  }

  static async updatePrompt(id: string, prompt: Partial<Prompt>): Promise<Prompt> {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      return this.handleResponse<Prompt>(response);
    } catch (error) {
      console.error('Error updating prompt:', error);
      throw new Error('Failed to update prompt');
    }
  }

  static async deletePrompt(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      throw new Error('Failed to delete prompt');
    }
  }
}
