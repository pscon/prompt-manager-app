# Mini Prompt Manager

A React application for managing prompts with CRUD operations, search, filtering, and rating functionality.

## Features

- **Authentication**: Username-only login with persistent session
- **Prompt Management**: Create, read, update, and delete prompts
- **Rating System**: Rate prompts with normalized 0-5 scale (0.5 increments)
- **Search & Filter**: Search by title/description and filter by category
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Loading & Error States**: Proper handling of async operations
- **Data Persistence**: User session persisted in localStorage

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prompt-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Login.tsx       # Login form component
│   ├── PromptCard.tsx  # Individual prompt card
│   └── PromptForm.tsx  # Add/edit prompt form
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   └── api.ts         # API service layer
├── types/              # TypeScript type definitions
│   └── index.ts       # Application types
├── utils/              # Utility functions
│   ├── rating.ts      # Rating normalization logic
│   └── __tests__/     # Test files
├── test/               # Test setup
│   └── setup.ts       # Test configuration
└── App.tsx            # Main application component
```

## Key Design Decisions

### 1. Rating Normalization
The API returns arbitrary rating values that are normalized to a 0-5 scale with 0.5 increments:
- Clamp values to [0, 100] range
- Scale by dividing by 20 (0→0, 100→5)
- Round to nearest 0.5 increment

### 2. State Management
- Used React Context API for authentication state
- Local component state for UI interactions
- No external state management library to keep it simple

### 3. Error Handling
- Comprehensive error boundaries and try-catch blocks
- User-friendly error messages
- Graceful fallbacks for failed operations

### 4. API Design
- Centralized API service with consistent error handling
- Type-safe API calls with TypeScript interfaces
- Proper HTTP status code handling

### 5. UI/UX Considerations
- Responsive design with mobile-first approach
- Loading states for better user experience
- Confirmation dialogs for destructive actions
- Form validation with real-time feedback

## API Integration

The application integrates with the MockAPI endpoint:
- **Base URL**: `https://68dedf2c898434f413564016.mockapi.io/api/v1`
- **Endpoints**:
  - `GET /Prompts` - Fetch all prompts
  - `POST /Prompts` - Create new prompt
  - `PUT /Prompts/:id` - Update prompt
  - `DELETE /Prompts/:id` - Delete prompt

## Testing

The project includes unit tests for critical utility functions:

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

Tests cover:
- Rating normalization logic
- Edge cases and boundary conditions
- Rounding behavior

## Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Future Improvements

If this project were to be extended beyond the 3-hour timebox, here's what I would implement next:

### 1. Enhanced Testing
- Component integration tests
- API service mocking
- End-to-end tests with Playwright

### 2. Performance Optimizations
- React.memo for expensive components
- Virtual scrolling for large prompt lists
- Debounced search input

### 3. Additional Features
- Prompt categories management
- Bulk operations (delete multiple prompts)
- Export/import functionality
- Prompt templates
- User preferences and settings

### 4. Code Quality
- ESLint configuration improvements
- Prettier for code formatting
- Husky for pre-commit hooks
- More comprehensive TypeScript types

### 5. Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast mode

### 6. Error Monitoring
- Error boundary implementation
- Logging service integration
- User feedback collection

## CORS Handling

If you encounter CORS issues during development, you can:

1. Use a browser extension to disable CORS
2. Run the app with a proxy server
3. Fetch the data once and serve it locally (as mentioned in the requirements)

## License

This project is created for assessment purposes.