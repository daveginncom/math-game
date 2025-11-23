import { describe, it, expect } from "vitest";
import {
  generateProblem,
  generateWrongAnswers,
  formatProblem,
} from "./mathUtils";

describe("mathUtils", () => {
  describe("generateProblem", () => {
    it("generates addition problems within 0-10 range", () => {
      const problem = generateProblem("addition");
      expect(problem.num1).toBeGreaterThanOrEqual(0);
      expect(problem.num1).toBeLessThanOrEqual(10);
      expect(problem.num2).toBeGreaterThanOrEqual(0);
      expect(problem.num2).toBeLessThanOrEqual(10);
      expect(problem.correctAnswer).toBe(problem.num1 + problem.num2);
      expect(problem.operation).toBe("addition");
    });

    it("generates subtraction problems with non-negative results", () => {
      const problem = generateProblem("subtraction");
      expect(problem.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(problem.correctAnswer).toBeLessThanOrEqual(10);
      expect(problem.correctAnswer).toBe(problem.num1 - problem.num2);
      expect(problem.operation).toBe("subtraction");
    });

    it("generates multiplication problems within 0-12 range", () => {
      const problem = generateProblem("multiplication");
      expect(problem.num1).toBeGreaterThanOrEqual(0);
      expect(problem.num1).toBeLessThanOrEqual(12);
      expect(problem.num2).toBeGreaterThanOrEqual(0);
      expect(problem.num2).toBeLessThanOrEqual(12);
      expect(problem.correctAnswer).toBe(problem.num1 * problem.num2);
      expect(problem.operation).toBe("multiplication");
    });

    it("generates division problems with whole number answers", () => {
      const problem = generateProblem("division");
      expect(problem.correctAnswer).toBe(problem.num1 / problem.num2);
      expect(Number.isInteger(problem.correctAnswer)).toBe(true);
      expect(problem.operation).toBe("division");
    });

    it("generates problems with specific number for addition", () => {
      const specificNumber = 5;
      const problem = generateProblem("addition", specificNumber);
      expect(problem.num1).toBe(specificNumber);
      expect(problem.correctAnswer).toBe(problem.num1 + problem.num2);
    });

    it("generates problems with specific number for multiplication", () => {
      const specificNumber = 7;
      const problem = generateProblem("multiplication", specificNumber);
      expect(problem.num1).toBe(specificNumber);
      expect(problem.correctAnswer).toBe(problem.num1 * problem.num2);
    });
  });

  describe("generateWrongAnswers", () => {
    it("generates specified number of wrong answers", () => {
      const wrongAnswers = generateWrongAnswers(10, 3);
      expect(wrongAnswers).toHaveLength(3);
    });

    it("generates unique wrong answers", () => {
      const wrongAnswers = generateWrongAnswers(10, 5);
      const uniqueAnswers = new Set(wrongAnswers);
      expect(uniqueAnswers.size).toBe(wrongAnswers.length);
    });

    it("does not include the correct answer", () => {
      const correctAnswer = 10;
      const wrongAnswers = generateWrongAnswers(correctAnswer, 5);
      expect(wrongAnswers).not.toContain(correctAnswer);
    });

    it("generates non-negative wrong answers", () => {
      const wrongAnswers = generateWrongAnswers(5, 3);
      wrongAnswers.forEach((answer) => {
        expect(answer).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("formatProblem", () => {
    it("formats addition problem correctly", () => {
      const problem = {
        num1: 5,
        num2: 3,
        operation: "addition" as const,
        correctAnswer: 8,
      };
      expect(formatProblem(problem)).toBe("5 + 3 = ?");
    });

    it("formats subtraction problem correctly", () => {
      const problem = {
        num1: 10,
        num2: 4,
        operation: "subtraction" as const,
        correctAnswer: 6,
      };
      expect(formatProblem(problem)).toBe("10 - 4 = ?");
    });

    it("formats multiplication problem correctly", () => {
      const problem = {
        num1: 6,
        num2: 7,
        operation: "multiplication" as const,
        correctAnswer: 42,
      };
      expect(formatProblem(problem)).toBe("6 × 7 = ?");
    });

    it("formats division problem correctly", () => {
      const problem = {
        num1: 20,
        num2: 4,
        operation: "division" as const,
        correctAnswer: 5,
      };
      expect(formatProblem(problem)).toBe("20 ÷ 4 = ?");
    });
  });
});
