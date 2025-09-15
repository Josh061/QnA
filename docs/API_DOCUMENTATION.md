# API Documentation

## Survey API

### GET /api/survey

Retrieves survey questions and sections data.

#### Response Format
```typescript
{
  questions: Question[];     // Flat array of questions (backward compatibility)
  sections?: Section[];      // Sectioned questions (when available)
}

type Question = {
  id: string;
  question: string;
  options: string[];
  type: string;
}

type Section = {
  title: string;
  questions: {
    question: string;
    options?: string[];
    type?: string;
  }[];
}
```

#### Example Response
```json
{
  "questions": [
    {
      "id": "1",
      "question": "I am a quiet and cooperative person.",
      "options": ["True", "False"],
      "type": "single"
    }
  ],
  "sections": [
    {
      "title": "Section 1: Personality and Cooperation",
      "questions": [
        {
          "question": "I am a quiet and cooperative person.",
          "options": ["True", "False"],
          "type": "single"
        }
      ]
    }
  ]
}
```

#### Error Responses
- `404` - Survey file not found
- `500` - Failed to parse survey

#### Data Sources
1. **Excel File**: `Copy of survey_quest(1).xlsx` (if available)
2. **Sections**: `sections.ts` (fallback with 18 sections)
3. **Questions**: `questions.ts` (final fallback)

## Question Structure

### Section Organization
Questions are organized into 18 sections, each containing 10 questions:

1. **Personality and Cooperation** (Questions 1-10)
2. **Fairness and Social Interactions** (Questions 11-20)
3. **Rules and Behavior** (Questions 21-30)
4. **Obedience and Authority** (Questions 31-40)
5. **Excitement and Adventure** (Questions 41-50)
6. **Self-Criticism and Emotions** (Questions 51-60)
7. **Social Withdrawal** (Questions 61-70)
8. **Helping and Caring** (Questions 71-80)
9. **Optimism and Problem-Solving** (Questions 81-90)
10. **Anxiety and Kindness** (Questions 91-100)
11. **Logic and Emotions** (Questions 101-110)
12. **Planning and Realism** (Questions 111-120)
13. **Warmth and Relationships** (Questions 121-130)
14. **Expressiveness and Creativity** (Questions 131-140)
15. **Sociability and Decision-Making** (Questions 141-150)
16. **Ambition and Efficiency** (Questions 151-160)
17. **Influence and Leadership** (Questions 161-170)
18. **Persuasion and Motivation** (Questions 171-180)

### Question ID Format
- **Sectioned**: `{sectionIndex}-{questionIndex}` (e.g., "1-1", "2-5")
- **Flat**: Sequential numbers (e.g., "1", "2", "3")

### Answer Format
All questions use True/False options by default, with support for custom options from Excel files.

