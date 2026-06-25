import type { LessonPlanData } from '../types/lessonPlan'

export const PLACEHOLDER_LESSON_PLAN: LessonPlanData = {
  learningGoals:
    'Students will understand that:\n• Solving equations means finding values that make the equation true\n• Inverse operations can be used to isolate variables\n• Algebraic equations can represent real-world situations',
  gradeLevel: '8th Grade',
  taskDescription:
    'Solve for x: 3x + 7 = 22. Present your reasoning in at least two different ways.',
  taskLaunch:
    "Pose the equation and ask: 'What would you do first to solve this? Turn and talk to a partner for 1 minute.'",
  anticipatedStrategies: [
    {
      strategy: 'Guess and check',
      questions:
        "What made you try that value? How do you know when you've found the right answer?",
      who: '',
      order: '1',
    },
    {
      strategy: 'Table of values',
      questions: 'How does your table show whether x is correct? What pattern do you notice?',
      who: '',
      order: '2',
    },
    {
      strategy: 'Inverse operations (algebraic)',
      questions:
        'Why did you subtract 7 first? What happens to both sides of the equation?',
      who: '',
      order: '3',
    },
    {
      strategy: 'Misconception: not applying the operation to both sides',
      questions:
        'Is the equation still balanced after that step? What does it mean for both sides to stay equal?',
      who: '',
      order: '',
    },
    {
      strategy: '',
      questions: '',
      who: '',
      order: '',
    },
  ],
  tentativeSequencing: '1. Guess and check → 2. Table of values → 3. Inverse operations',
  tentativeSequencingDetails:
    'Begin with informal methods to build intuition before formalizing algebraic procedures.',
  mathematicalConnections:
    'All methods find the value that makes the equation true — connecting the concept of equality to procedural solving.',
  mathematicalConnectionsDetails:
    '"What do these methods have in common? What does it mean to solve an equation?"',
}
