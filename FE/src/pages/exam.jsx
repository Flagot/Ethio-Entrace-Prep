import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PLACEHOLDER_QUESTIONS = [
  {
    id: "q1",
    question: "If 3x + 5 = 20, what is x?",
    choices: ["3", "4", "5", "6"],
  },
  {
    id: "q2",
    question: "Choose the best synonym for 'concise'.",
    choices: ["Verbose", "Brief", "Unclear", "Complex"],
  },
  {
    id: "q3",
    question: "What is the value of 12% of 250?",
    choices: ["20", "25", "30", "35"],
  },
];

function Exam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = PLACEHOLDER_QUESTIONS[currentQuestion];
  const selected = answers[question.id];

  const progress = useMemo(
    () => Math.round(((currentQuestion + 1) / PLACEHOLDER_QUESTIONS.length) * 100),
    [currentQuestion]
  );

  const handleNext = () => {
    if (currentQuestion < PLACEHOLDER_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }
    navigate("/home");
  };

  return (
    <main className="min-h-screen bg-(--color-surface-alt) text-(--color-text)">
      <section className="mx-auto w-full max-w-4xl p-6 md:p-8">
        <header className="mb-5 rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
          <p className="text-xs uppercase tracking-wide text-(--color-muted)">Placeholder Exam</p>
          <h1 className="mt-1 text-xl font-semibold">Exam: {examId || "mock-exam"}</h1>
          <p className="mt-2 text-sm text-(--color-muted)">
            Placeholder questions are shown for UI stage; database fetch is disabled.
          </p>
          <div className="mt-3 h-2 rounded bg-(--color-input-bg)">
            <div className="h-2 rounded bg-(--color-primary)" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <article className="rounded-xl border border-(--color-border) bg-(--color-surface) p-5">
          <p className="text-sm text-(--color-muted)">
            Question {currentQuestion + 1} of {PLACEHOLDER_QUESTIONS.length}
          </p>
          <h2 className="mt-3 text-lg font-medium">{question.question}</h2>

          <div className="mt-4 space-y-2">
            {question.choices.map((choice, idx) => (
              <label
                key={choice}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                  selected === idx
                    ? "border-(--color-text) bg-(--color-input-bg)"
                    : "border-(--color-border) bg-transparent"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={selected === idx}
                  onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: idx }))}
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm"
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-md bg-(--color-primary) px-3 py-2 text-sm text-(--color-on-primary)"
            >
              {currentQuestion === PLACEHOLDER_QUESTIONS.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Exam;
