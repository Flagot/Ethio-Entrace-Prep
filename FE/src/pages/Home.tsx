import { useMemo, useState } from "react";
import Card from "../components/cards";
import Sidebar from "../components/sidebar";

const EXAM_PLACEHOLDERS = [
  { _id: "ethio-2015-math", title: "Ethiopian Math Mock - Set 1", questions: 45, duration: 60, status: "available", label: "Available" },
  { _id: "ethio-2015-verbal", title: "English Reasoning Mock - Set 1", questions: 40, duration: 55, status: "in-progress", label: "In progress" },
  { _id: "ethio-2014-mixed", title: "Mixed Subjects Mock - Set 2", questions: 50, duration: 70, status: "completed", label: "Completed" },
  { _id: "ethio-2013-science", title: "Science Mock - Set 1", questions: 35, duration: 45, status: "available", label: "Available" },
];

function Home() {
  const [filter, setFilter] = useState("all");

  const exams = useMemo(() => {
    if (filter === "all") return EXAM_PLACEHOLDERS;
    return EXAM_PLACEHOLDERS.filter((exam) => exam.status === filter);
  }, [filter]);

  return (
    <main className="flex min-h-screen bg-(--color-bg) text-(--color-text)">
      <Sidebar />
      <section className="min-w-0 flex-1 bg-(--color-surface-alt) p-6 md:p-8">
        <header className="mb-6 border-b border-(--color-border) pb-4">
          <h1 className="text-3xl font-semibold tracking-tight">Exam Dashboard</h1>
          <p className="mt-2 text-sm text-(--color-muted)">
            Placeholder exam data is used for now. Backend integration comes in the next stage.
          </p>
        </header>

        <div className="mb-5 flex flex-wrap gap-2">
          {["all", "available", "in-progress", "completed"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-md px-3 py-1.5 text-sm capitalize transition ${
                filter === item
                  ? "bg-(--color-primary) text-(--color-on-primary)"
                  : "bg-(--color-input-bg) text-(--color-text) border border-(--color-border)"
              }`}
            >
              {item.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <Card
              key={exam._id}
              title={exam.title}
              description={exam.label}
              examId={exam._id}
              status={exam.status}
              questionCount={exam.questions}
              duration={exam.duration}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
