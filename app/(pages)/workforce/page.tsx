import { WorkforceDashboard } from "./components/WorkforceDashboard";

export default function WorkforcePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 dark:bg-slate-950">
      <main className="mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-12 xl:px-24">
        <WorkforceDashboard />
      </main>
    </div>
  );
}
