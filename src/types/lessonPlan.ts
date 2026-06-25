export interface AnticipatedStrategy {
  strategy: string
  questions: string
  who: string
  order: string
}

export interface LessonPlanData {
  learningGoals: string
  gradeLevel: string
  taskDescription: string
  taskLaunch: string
  anticipatedStrategies: AnticipatedStrategy[]
  tentativeSequencing: string
  tentativeSequencingDetails: string
  mathematicalConnections: string
  mathematicalConnectionsDetails: string
}
