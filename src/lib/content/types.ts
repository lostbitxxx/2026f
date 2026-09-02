export type QuizOption = {
  label: string;
  text: string;
};

export type McQuizQuestion = {
  type: "mc";
  id: string;
  source: string;
  prompt: string;
  options: QuizOption[];
  answer: string;
  explanation: string;
};

export type OpenQuizQuestion = {
  type: "open";
  id: string;
  source: string;
  prompt: string;
  answer: string;
};

export type QuizQuestion = McQuizQuestion | OpenQuizQuestion;

export function isMcQuestion(
  question: QuizQuestion,
): question is McQuizQuestion {
  return question.type === "mc";
}

export type QuizTopic = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type Quiz = {
  id: string;
  title: string;
  topics: QuizTopic[];
};

export type Chapter = {
  id: string;
  title: string;
  noteFile: string;
  quizFile: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
};
