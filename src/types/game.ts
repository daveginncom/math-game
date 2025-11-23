export type OperationType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export type PracticeMode = "all" | "specific";

export interface GameSettings {
  operation: OperationType;
  practiceMode: PracticeMode;
  specificNumber?: number; // Only used when practiceMode is "specific"
  practiceDuration: 30 | 60 | 90; // Practice duration in seconds
}

export interface MathProblem {
  num1: number;
  num2: number;
  operation: OperationType;
  correctAnswer: number;
}

export interface FallingAnswer {
  id: string;
  value: number;
  x: number;
  y: number;
  speed: number;
  isCorrect: boolean;
}

export interface GameState {
  status: "menu" | "playing" | "paused" | "gameOver";
  settings: GameSettings | null;
  currentProblem: MathProblem | null;
  fallingAnswers: FallingAnswer[];
  bullets: Bullet[];
  playerX: number;
  score: number;
  lives: number;
  level: number;
  showingAnswer: boolean;
  timeRemaining: number; // Time remaining in seconds
}

export interface Position {
  x: number;
  y: number;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  speed: number;
}
