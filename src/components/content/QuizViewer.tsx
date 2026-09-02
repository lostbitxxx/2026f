"use client";

import { useState } from "react";
import { BrutalButton } from "@/components/BrutalButton";
import { BrutalCard } from "@/components/BrutalCard";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import type { McQuizQuestion, OpenQuizQuestion, Quiz } from "@/lib/content/types";
import { isMcQuestion } from "@/lib/content/types";

type QuizViewerProps = {
  quiz: Quiz;
};

type McQuestionState = {
  selected: string | null;
  checked: boolean;
  showExplanation: boolean;
};

function McQuestionBlock({ question }: { question: McQuizQuestion }) {
  const [state, setState] = useState<McQuestionState>({
    selected: null,
    checked: false,
    showExplanation: false,
  });

  const isCorrect = state.selected === question.answer;

  function handleCheck() {
    if (!state.selected) {
      return;
    }
    setState((prev) => ({ ...prev, checked: true }));
  }

  function handleReset() {
    setState({ selected: null, checked: false, showExplanation: false });
  }

  function optionClass(label: string) {
    const base =
      "w-full border-[3px] border-fg px-4 py-3 text-left text-sm transition-colors";

    if (!state.checked) {
      return state.selected === label
        ? `${base} bg-fg text-bg`
        : `${base} bg-bg hover:bg-fg/10`;
    }

    if (label === question.answer) {
      return `${base} bg-green-400 text-fg`;
    }

    if (label === state.selected) {
      return `${base} border-accent bg-accent/20 text-fg`;
    }

    return `${base} bg-bg opacity-50`;
  }

  return (
    <div className="border-t-[3px] border-fg pt-6 first:border-t-0 first:pt-0">
      <QuestionHeader source={question.source} prompt={question.prompt} />

      <div className="mb-4 flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option.label}
            type="button"
            disabled={state.checked}
            onClick={() =>
              setState((prev) => ({ ...prev, selected: option.label }))
            }
            className={optionClass(option.label)}
          >
            <span className="mr-2 font-bold">{option.label}.</span>
            {option.text}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {!state.checked ? (
          <BrutalButton
            type="button"
            onClick={handleCheck}
            className={!state.selected ? "pointer-events-none opacity-40" : ""}
          >
            Check Answer
          </BrutalButton>
        ) : (
          <>
            <span
              className={`inline-flex items-center border-[3px] border-fg px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                isCorrect ? "bg-green-400 text-fg" : "border-accent bg-accent/20"
              }`}
            >
              {isCorrect ? "Correct" : `Wrong — answer is ${question.answer}`}
            </span>
            <BrutalButton type="button" onClick={handleReset}>
              Retry
            </BrutalButton>
            <BrutalButton
              type="button"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  showExplanation: !prev.showExplanation,
                }))
              }
            >
              {state.showExplanation ? "Hide" : "Show"} Explanation
            </BrutalButton>
          </>
        )}
      </div>

      {state.showExplanation && state.checked && (
        <p className="mt-4 border-l-[6px] border-accent bg-fg/5 py-2 pl-4 text-sm leading-relaxed">
          {question.explanation}
        </p>
      )}
    </div>
  );
}

function OpenQuestionBlock({ question }: { question: OpenQuizQuestion }) {
  const [response, setResponse] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border-t-[3px] border-fg pt-6 first:border-t-0 first:pt-0">
      <QuestionHeader source={question.source} prompt={question.prompt} />

      <label className="mb-2 block text-xs font-bold uppercase tracking-widest">
        Your answer
      </label>
      <textarea
        value={response}
        onChange={(event) => setResponse(event.target.value)}
        rows={6}
        placeholder="Type your answer here..."
        className="mb-4 w-full resize-y border-[3px] border-fg bg-bg p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="flex flex-wrap gap-2">
        <BrutalButton
          type="button"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </BrutalButton>
      </div>

      {showAnswer && (
        <div className="mt-4 border-l-[6px] border-accent bg-fg/5 py-3 pl-4 pr-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest">
            Model answer
          </p>
          <MarkdownContent content={question.answer} />
        </div>
      )}
    </div>
  );
}

function QuestionHeader({
  source,
  prompt,
}: {
  source: string;
  prompt: string;
}) {
  return (
    <>
      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-accent">
        {source}
      </div>
      <p className="mb-4 whitespace-pre-line text-base font-medium leading-relaxed">
        {prompt}
      </p>
    </>
  );
}

export function QuizViewer({ quiz }: QuizViewerProps) {
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  function toggleTopic(topicId: string) {
    setOpenTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  }

  return (
    <div className="flex flex-col gap-6">
      {quiz.topics.map((topic) => {
        const isOpen = openTopics[topic.id] ?? true;

        return (
          <BrutalCard key={topic.id}>
            <button
              type="button"
              onClick={() => toggleTopic(topic.id)}
              className="mb-4 flex w-full items-center justify-between text-left"
            >
              <h2 className="text-lg font-bold uppercase tracking-wider">
                {topic.title}
              </h2>
              <span className="text-sm font-bold">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-6">
                {topic.questions.map((question) =>
                  isMcQuestion(question) ? (
                    <McQuestionBlock key={question.id} question={question} />
                  ) : (
                    <OpenQuestionBlock key={question.id} question={question} />
                  ),
                )}
              </div>
            )}
          </BrutalCard>
        );
      })}
    </div>
  );
}
