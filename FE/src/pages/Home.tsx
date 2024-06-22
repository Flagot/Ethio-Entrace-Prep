import { useMemo, useState } from "react";
import Card from "../components/cards";
import Sidebar from "../components/sidebar";

const SESSION_EXAMS = [
  { _id: "session-ethio-2015-math", title: "Math Session - 2015", questions: 45, duration: 60, status: "in-progress", label: "In progress", sessionType: "active" },
  { _id: "session-ethio-2014-mixed", title: "Mixed Session - 2014", questions: 50, duration: 70, status: "completed", label: "Completed", sessionType: "past" },
  { _id: "session-ethio-2013-english", title: "English Session - 2013", questions: 40, duration: 55, status: "completed", label: "Completed", sessionType: "past" },
];

const ALL_EXAMS = [
  { _id: "ethio-2015-math", title: "Ethiopian Math Mock - Set 1", questions: 45, duration: 60, status: "available", label: "Available", year: "2015", subject: "Math" },
  { _id: "ethio-2015-english", title: "Ethiopian English Mock - Set 1", questions: 40, duration: 55, status: "available", label: "Available", year: "2015", subject: "English" },
  { _id: "ethio-2014-biology", title: "Ethiopian Biology Mock - Set 2", questions: 38, duration: 50, status: "available", label: "Available", year: "2014", subject: "Biology" },
  { _id: "ethio-2014-physics", title: "Ethiopian Physics Mock - Set 2", questions: 42, duration: 55, status: "available", label: "Available", year: "2014", subject: "Physics" },
  { _id: "ethio-2013-chemistry", title: "Ethiopian Chemistry Mock - Set 3", questions: 36, duration: 48, status: "available", label: "Available", year: "2013", subject: "Chemistry" },
];

function Home() {
  const [sessionFilter, setSessionFilter] = useState("active");
  const [yearFilter, setYearFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const years = useMemo(
    () => ["all", ...new Set(ALL_EXAMS.map((exam) => exam.year))],
    []
  );

  const subjects = useMemo(
    () => ["all", ...new Set(ALL_EXAMS.map((exam) => exam.subject))],
    []
  );

  const sessionExams = useMemo(
    () => SESSION_EXAMS.filter((exam) => exam.sessionType === sessionFilter),
    [sessionFilter]
  );

  const allExams = useMemo(
    () =>
      ALL_EXAMS.filter((exam) => {
        const matchesYear = yearFilter === "all" || exam.year === yearFilter;
        const matchesSubject = subjectFilter === "all" || exam.subject === subjectFilter;
        return matchesYear && matchesSubject;
      }),
    [yearFilter, subjectFilter]
  );

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

        <section className="mb-8 rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Your Exams</h2>
              <p className="text-sm text-(--color-muted)">Track active sessions and completed exams.</p>
            </div>
            <div className="flex gap-2">
              {["active", "past"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSessionFilter(item)}
                  className={`rounded-md px-3 py-1.5 text-sm capitalize transition ${
                    sessionFilter === item
                      ? "bg-(--color-primary) text-(--color-on-primary)"
                      : "border border-(--color-border) bg-(--color-input-bg) text-(--color-text)"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessionExams.map((exam) => (
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

        <section className="rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">All Exams</h2>
              <p className="text-sm text-(--color-muted)">Filter exam catalog by year and subject.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setYearFilter("all");
                  setSubjectFilter("all");
                }}
                className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-1.5 text-sm"
              >
                All
              </button>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-1.5 text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "By year" : year}
                  </option>
                ))}
              </select>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-1.5 text-sm"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "all" ? "By subject" : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {allExams.map((exam) => (
              <Card
                key={exam._id}
                title={`${exam.title} (${exam.year} • ${exam.subject})`}
                description={exam.label}
                examId={exam._id}
                status={exam.status}
                questionCount={exam.questions}
                duration={exam.duration}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
