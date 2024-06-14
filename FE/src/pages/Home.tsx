import LogoutButton from "../components/LogoutButton";

function Home() {
  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-10">
        <div className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) p-8 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">Home</h1>
            <LogoutButton />
          </div>
          <p className="mt-3 text-sm text-(--color-muted)">
            Welcome to your Ethiopian entrance exam preparation dashboard.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
