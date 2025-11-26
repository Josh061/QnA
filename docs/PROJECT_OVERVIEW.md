# Q&A Survey Application - Project Documentation

## Overview
A modern, responsive personality assessment application built with Next.js 15, featuring a beautiful UI with animations and a comprehensive 18-section questionnaire system.

## 🚀 Features

### Core Functionality
- **18-Section Personality Test**: Comprehensive questionnaire covering personality traits, social interactions, behavior patterns, and more
- **Page-by-Page Navigation**: One question per screen with smooth transitions
- **Sectioned Questions**: Organized into logical categories with clear section headers
- **Progress Tracking**: Visual progress bar and question counter
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### UI/UX Features
- **Modern Design**: Clean, gradient-based interface with dark/light mode support
- **Smooth Animations**: Fade-in effects, hover animations, and micro-interactions
- **Interactive Elements**: Animated option cards with hover effects and selection states
- **Accessibility**: Proper focus states, keyboard navigation, and screen reader support

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom animations
- **Excel Integration**: Support for loading questions from Excel files
- **API Routes**: RESTful endpoints for survey data management

## 📁 Project Structure

```
QnA/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   │   ├── (auth)/         # Authentication pages
│   │   │   │   ├── login/      # Login page
│   │   │   │   └── register/   # Registration page
│   │   │   ├── api/            # API routes
│   │   │   │   └── survey/     # Survey API endpoints
│   │   │   │       ├── route.ts        # Main API handler
│   │   │   │       ├── questions.ts    # Fallback questions
│   │   │   │       └── sections.ts     # Sectioned questions
│   │   │   ├── test/           # Test page
│   │   │   │   └── page.tsx    # Main questionnaire UI
│   │   │   ├── globals.css     # Global styles & animations
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Homepage
│   │   └── components/         # Reusable components
│   │       ├── AuthCard.tsx    # Authentication card
│   │       ├── GradientBackground.tsx
│   │       └── Navbar.tsx      # Navigation component
│   ├── package.json            # Dependencies & scripts
│   └── next.config.ts          # Next.js configuration
├── docs/                       # Documentation
│   └── README.md
└── Copy of survey_quest(1).xlsx # Excel survey data
```

## 🎯 Question Sections

The questionnaire is organized into 18 comprehensive sections:

1. **Personality and Cooperation** - Basic personality traits and social behavior
2. **Fairness and Social Interactions** - Perceptions of fairness and social comfort
3. **Rules and Behavior** - Adherence to rules and behavioral patterns
4. **Obedience and Authority** - Attitudes toward authority and rules
5. **Excitement and Adventure** - Risk-taking and adventure-seeking tendencies
6. **Self-Criticism and Emotions** - Self-perception and emotional regulation
7. **Social Withdrawal** - Social comfort and isolation tendencies
8. **Helping and Caring** - Altruistic behavior and care for others
9. **Optimism and Problem-Solving** - Outlook and problem-solving approaches
10. **Anxiety and Kindness** - Anxiety levels and kindness tendencies
11. **Logic and Emotions** - Decision-making style (logical vs emotional)
12. **Planning and Realism** - Planning tendencies and realistic outlook
13. **Warmth and Relationships** - Interpersonal warmth and relationship building
14. **Expressiveness and Creativity** - Creative expression and communication
15. **Sociability and Decision-Making** - Social behavior and decision processes
16. **Ambition and Efficiency** - Career ambition and efficiency traits
17. **Influence and Leadership** - Leadership qualities and influence
18. **Persuasion and Motivation** - Persuasion skills and motivation patterns

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling framework
- **XLSX 0.18.5** - Excel file processing

### Development Tools
- **ESLint 9** - Code linting
- **Turbopack** - Fast bundling (dev mode)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Usage

### Taking the Test
1. Navigate to `/test` to start the questionnaire
2. Answer questions one by one using the True/False options
3. Use Previous/Next buttons to navigate
4. Progress is tracked with a visual progress bar
5. Section titles are displayed for context
6. Submit when all questions are completed

### API Endpoints
- `GET /api/survey` - Retrieve survey questions and sections
  - Returns both flat questions array and sectioned data
  - Supports Excel file fallback
  - Maintains backward compatibility

## 🎨 Design System

### Colors
- **Primary**: Indigo-based accent colors
- **Background**: Gradient from white to slate (light mode)
- **Dark Mode**: Gradient from dark blue to black
- **Interactive**: Hover states with indigo highlights

### Animations
- **Fade-in**: Smooth entrance animations for content
- **Card Hover**: Subtle lift effect on interactive elements
- **Pulse**: Soft glow effect for selected options
- **Smooth Transitions**: 200ms ease transitions throughout

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Hierarchy**: Clear heading structure with proper spacing
- **Responsive**: Scales appropriately across devices

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- Questions can be modified in `frontend/src/app/api/survey/sections.ts`
- Styling can be customized in `frontend/src/app/globals.css`
- Excel file support for dynamic question loading

## 📊 Data Flow

1. **Question Loading**: API fetches questions from sections.ts or Excel file
2. **State Management**: React state manages current question, answers, and progress
3. **Navigation**: Step-based navigation with validation
4. **Submission**: Answers are collected and can be processed/submitted

## 🚀 Deployment

### Production Build
```bash
cd frontend
npm run build
npm run start
```

### Recommended Platforms
- Vercel (optimized for Next.js)
- Netlify
- Any Node.js hosting platform

## 🔮 Future Enhancements

- User authentication and result storage
- Advanced analytics and reporting
- Question randomization
- Multi-language support
- Result visualization and insights
- Export functionality for results

## 📝 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

