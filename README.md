
# AI Portrait & Poem Generator

This application allows users to generate personalized AI portraits and poems based on their photos and information. The application uses a mock OpenAI service to simulate AI generation, but can be connected to actual AI services in production.

## 🚀 Quick Start

Follow these steps to run the application locally:

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ai-portrait-poem-generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

## 📂 Project Structure

### Key Files and Directories

```
├── src/
│   ├── components/           # UI components
│   │   ├── AppHeader.tsx     # Application header
│   │   ├── ImageCapture.tsx  # Component for capturing user images
│   │   ├── ProcessingLoader.tsx # Loading indicator
│   │   ├── ResultsDisplay.tsx   # Displays generated content
│   │   ├── UserForm.tsx      # User information form
│   │   └── ui/               # Shadcn UI components
│   ├── pages/
│   │   ├── Index.tsx         # Main application page
│   │   └── NotFound.tsx      # 404 page
│   ├── utils/
│   │   └── openaiService.ts  # Mock OpenAI service for content generation
│   ├── types/
│   │   └── types.ts          # TypeScript type definitions
│   ├── App.tsx               # App component with routing
│   └── main.tsx              # Application entry point
```

## 🔄 Application Flow

1. User enters their personal information (name, designation, company, email)
2. User captures or uploads their photos
3. The application sends this data to the AI service
4. The AI generates a personalized poem and portrait
5. User can view, print, or email the generated content

## 🖼️ Image Generation

The application simulates AI image generation through the `generatePortrait` function in `src/utils/openaiService.ts`. This function takes user images and information, and returns an AI-generated portrait URL.

Available portrait styles:
- Professional
- LinkedIn
- AI Avatar
- Marvel Character
- Rockstar
- GTA 5 Character

In the mock implementation, pre-selected images are returned based on the selected style. In a production environment, this would connect to OpenAI's DALL-E or a similar AI image generation service.

## 📝 Poem Generation

Poems are generated through the `generatePoem` function in `src/utils/openaiService.ts`. This function takes the user's name, designation, and company to create a personalized poem.

## 🔌 API Calls

### Mock Implementation

The current implementation uses mock functions that simulate API calls:

- `src/utils/openaiService.ts`: Contains `generatePoem` and `generatePortrait` functions that mimic API calls with timeouts to simulate network requests.

### Production Implementation

To connect to real AI services:

1. Replace the mock implementations in `openaiService.ts` with actual API calls
2. Add your API keys to environment variables

## 🔐 Environment Configuration

### Environment Variables

The application does not currently use environment variables as it's using mock services. For production use, you should add these environment variables:

```
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_BASE_API_URL=your_api_base_url
```

To use environment variables:

1. Create a `.env` file in the root directory
2. Add your environment variables to the file
3. Access them in the code using `import.meta.env.VITE_VARIABLE_NAME`

### Environment Types

- Development: Used during local development (`npm run dev`)
- Production: Used for deployed applications (`npm run build && npm run preview`)

## 💾 Data Storage

The application currently uses `localStorage` to store generated results locally in the user's browser. There is no database connection in the current implementation.

For a production environment, you could integrate:
- Supabase: For a serverless database and storage solution
- Firebase: For real-time database and authentication
- MongoDB: For a document-based NoSQL database

## 🔧 Technologies Used

- **React**: Frontend UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on Radix UI
- **React Router**: For routing
- **React Query**: For data fetching and caching
- **React Webcam**: For capturing user photos
- **UUID**: For generating unique IDs

## 🖨️ Printing Functionality

The application includes specialized printing functionality for A6-sized cards, which can be triggered from the Results page. The print layout is styled using CSS print media queries to ensure proper sizing and formatting.

## 📊 Technical Architecture Diagram

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌─────────────┐        ┌────────────────┐  │
│  │  User Form  │───────▶│  User Data     │  │
│  └─────────────┘        └────────────────┘  │
│         │                       │           │
│         ▼                       ▼           │
│  ┌─────────────┐        ┌────────────────┐  │
│  │Image Capture│───────▶│ Captured Images│  │
│  └─────────────┘        └────────────────┘  │
│         │                       │           │
│         └───────────────────────┘           │
│                     │                       │
│                     ▼                       │
│  ┌──────────────────────────────────────┐   │
│  │          Mock OpenAI Service         │   │
│  │  ┌─────────────┐  ┌──────────────┐   │   │
│  │  │generatePoem │  │generatePortrait│   │   │
│  │  └─────────────┘  └──────────────┘   │   │
│  └──────────────────────────────────────┘   │
│                     │                       │
│                     ▼                       │
│  ┌──────────────────────────────────────┐   │
│  │          Generated Result            │   │
│  │  ┌─────────────┐  ┌──────────────┐   │   │
│  │  │    Poem     │  │   Portrait   │   │   │
│  │  └─────────────┘  └──────────────┘   │   │
│  └──────────────────────────────────────┘   │
│                     │                       │
│                     ▼                       │
│  ┌──────────────────────────────────────┐   │
│  │         Results Display              │   │
│  │  ┌─────────────────────────────────┐ │   │
│  │  │ Print | Email | Regenerate      │ │   │
│  │  └─────────────────────────────────┘ │   │
│  └──────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘

```

## 🚧 Future Improvements

1. Connect to actual OpenAI API for real AI-generated content
2. Add user authentication
3. Implement server-side storage of generated results
4. Add social media sharing functionality
5. Improve image processing for better AI portrait generation
6. Add more styling options for portraits and poems

## 📄 License

MIT License
