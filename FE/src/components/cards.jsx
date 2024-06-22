import { useNavigate } from "react-router-dom";

const Card = ({ title, description, examId, status = "available", questionCount = 0, duration = 0 }) => {
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    navigate(`/exam/${examId || "default-exam-id"}`);
  };

  const statusStyle =
    status === "in-progress"
      ? "bg-(--color-input-bg) border-(--color-border) text-(--color-text)"
      : status === "completed"
        ? "bg-(--color-primary) border-(--color-primary) text-(--color-on-primary)"
        : "bg-transparent border-(--color-border) text-(--color-muted)";

  const ctaLabel =
    status === "in-progress" ? "Resume" : status === "completed" ? "Review" : "Start";

  return (
    <article className="min-w-0 rounded-xl border border-(--color-border) bg-(--color-surface) p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-(--color-text)">{title || "Exam"}</h3>
        <span className={`rounded-md border px-2 py-1 text-xs ${statusStyle}`}>
          {description || "Available"}
        </span>
      </div>

      <p className="mt-3 text-sm text-(--color-muted)">
        {questionCount} questions • {duration} minutes
      </p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handlePrimaryAction}
          className="rounded-md border border-(--color-border) bg-(--color-input-bg) px-3 py-2 text-sm text-(--color-text) transition hover:bg-(--color-primary) hover:text-(--color-on-primary)"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
};

export default Card;
