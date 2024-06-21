import Sidebar from "../components/sidebar";

function Home() {
  return (
    <main className="flex min-h-screen bg-(--color-bg) text-(--color-text)">
      <Sidebar />
      <section className="min-w-0 flex-1 p-0">
        <div className="h-full w-full border-l border-(--color-border) bg-(--color-surface-alt) p-8">
          <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
          <p className="mt-4 text-sm text-(--color-muted)">
            Welcome to your Ethiopian entrance exam preparation dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
