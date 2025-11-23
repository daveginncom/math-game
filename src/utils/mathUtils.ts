import type { OperationType, MathProblem } from "../types/game";

/**
 * Generates a random math problem based on the operation type and constraints
 */
export function generateProblem(
  operation: OperationType,
  specificNumber?: number
): MathProblem {
  let num1: number;
  let num2: number;
  let correctAnswer: number;

  switch (operation) {
    case "addition":
      if (specificNumber !== undefined) {
        num1 = specificNumber;
        num2 = Math.floor(Math.random() * (10 - (10 - num1))) + 1;
      } else {
        num1 = Math.floor(Math.random() * 11);
        num2 = Math.floor(Math.random() * (11 - num1));
      }
      correctAnswer = num1 + num2;
      break;

    case "subtraction":
      if (specificNumber !== undefined) {
        num1 =
          specificNumber + Math.floor(Math.random() * (11 - specificNumber));
        num2 = specificNumber;
      } else {
        num2 = Math.floor(Math.random() * 11);
        num1 = num2 + Math.floor(Math.random() * (11 - num2));
      }
      correctAnswer = num1 - num2;
      break;

    case "multiplication":
      if (specificNumber !== undefined) {
        num1 = specificNumber;
        num2 = Math.floor(Math.random() * 13);
      } else {
        num1 = Math.floor(Math.random() * 13);
        num2 = Math.floor(Math.random() * 13);
      }
      correctAnswer = num1 * num2;
      break;

    case "division":
      if (specificNumber !== undefined) {
        num2 = specificNumber;
        const quotient = Math.floor(Math.random() * 13);
        num1 = num2 * quotient;
      } else {
        num2 = Math.floor(Math.random() * 12) + 1;
        const quotient = Math.floor(Math.random() * 13);
        num1 = num2 * quotient;
      }
      correctAnswer = num1 / num2;
      break;
  }

  return { num1, num2, operation, correctAnswer };
}

/**
 * Generates wrong answers that are plausible but incorrect
 */
export function generateWrongAnswers(
  correctAnswer: number,
  count: number = 3
): number[] {
  const wrongAnswers = new Set<number>();
  const range = Math.max(5, Math.floor(correctAnswer * 0.5));

  while (wrongAnswers.size < count) {
    const offset = Math.floor(Math.random() * range * 2) - range;
    const wrongAnswer = correctAnswer + offset;

    if (wrongAnswer !== correctAnswer && wrongAnswer >= 0) {
      wrongAnswers.add(wrongAnswer);
    }
  }

  return Array.from(wrongAnswers);
}

/**
 * Formats a math problem as a string
 */
export function formatProblem(problem: MathProblem): string {
  const symbols = {
    addition: "+",
    subtraction: "-",
    multiplication: "×",
    division: "÷",
  };

  return `${problem.num1} ${symbols[problem.operation]} ${problem.num2} = ?`;
}
