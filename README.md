# Mini Prompt Manager

A React application for managing prompts with CRUD operations, search, filtering, and rating functionality.

## Features

- Username-only login with persistent session
- Create, read, update, and delete prompts
- Search prompts by title/description
- Filter prompts by category
- Rate prompts (0-5 scale with 0.5 increments)
- Responsive design with Tailwind CSS
- Loading and error states

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Vitest for testing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/pscon/prompt-manager-app.git
cd prompt-manager-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

## API

Uses MockAPI endpoint: `https://68dedf2c898434f413564016.mockapi.io/api/v1/Prompts`

## Rating System

The API returns arbitrary rating values that are normalized to a 0-5 scale:
- Clamp values to [0, 100] range
- Scale by dividing by 20
- Round to nearest 0.5 increment

Examples: 10 → 0.5, 50 → 2.5, 80 → 4.0

## Testing

```bash
npm run test
```

## Build

```bash
npm run build
```

## Key Design Decisions

- **Rating Normalization**: API values are normalized to 0-5 scale with 0.5 increments using clamp → scale → round logic
- **State Management**: React Context for auth, local state for UI interactions
- **Error Handling**: Try-catch blocks with user-friendly messages and visual feedback
- **API Design**: Centralized service with consistent error handling and TypeScript types

## What's Incomplete / Next Steps

- Component integration tests
- API service mocking for tests
- Better error boundaries
- Performance optimizations (React.memo, debounced search)
- Accessibility improvements (ARIA labels, keyboard navigation)

## Deployed URL

[Mini Prompt Manager](https://mini-prompt-manager.netlify.app/)

## Author

Ekunola Paul