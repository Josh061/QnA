# Development Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Application
Navigate to `http://localhost:3000` in your browser.

## Project Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Route groups
│   │   ├── api/               # API routes
│   │   ├── test/              # Test page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   └── components/            # Reusable components
├── public/                    # Static assets
├── package.json               # Dependencies
└── next.config.ts            # Next.js config
```

### Key Files

#### Survey Data
- `src/app/api/survey/sections.ts` - 18 sections with 180 questions
- `src/app/api/survey/questions.ts` - Flat question array (fallback)
- `src/app/api/survey/route.ts` - API endpoint handler

#### UI Components
- `src/app/test/page.tsx` - Main questionnaire interface
- `src/app/globals.css` - Global styles and animations
- `src/components/` - Reusable UI components

## Development Workflow

### Adding New Questions
1. Edit `src/app/api/survey/sections.ts`
2. Add questions to appropriate section
3. Questions automatically appear in UI

### Modifying Styles
1. Edit `src/app/globals.css` for global styles
2. Use Tailwind classes in components
3. Custom animations defined in CSS

### API Changes
1. Modify `src/app/api/survey/route.ts`
2. Update response types if needed
3. Test with frontend integration

## Code Standards

### TypeScript
- Use strict typing throughout
- Define interfaces for data structures
- Avoid `any` types

### React Patterns
- Use functional components with hooks
- Implement proper state management
- Follow Next.js App Router patterns

### Styling
- Use Tailwind CSS classes
- Implement responsive design
- Maintain dark/light mode support

## Testing

### Manual Testing
1. Navigate through all questions
2. Test Previous/Next navigation
3. Verify progress tracking
4. Check responsive design
5. Test dark/light mode

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Performance Optimization

### Next.js Features
- App Router for better performance
- Turbopack for faster builds
- Automatic code splitting

### Image Optimization
- Use Next.js Image component
- Optimize for different screen sizes

### Bundle Analysis
```bash
npm run build
# Analyze bundle size
```

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
No environment variables required for basic functionality.

### Static Export (Optional)
```bash
npm run build
# Configure for static export in next.config.ts
```

## Troubleshooting

### Common Issues

#### Development Server Won't Start
- Check Node.js version (18+ required)
- Clear node_modules and reinstall
- Check port availability (3000)

#### Questions Not Loading
- Verify API endpoint is working
- Check browser console for errors
- Ensure sections.ts is properly formatted

#### Styling Issues
- Clear browser cache
- Check Tailwind CSS compilation
- Verify CSS import order

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

## Contributing

### Code Style
- Follow existing patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and small

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

### File Naming
- Use kebab-case for files
- Use PascalCase for components
- Use camelCase for functions

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tools
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - VS Code extension
- [ESLint](https://eslint.org/) - Code linting

---

**Happy coding! 🚀**

