import {
  ActivityPanel,
  AgentQuickChat,
  ChatWidget,
  CollaborationBar,
  FooterSection,
  HeroSection,
  KanbanBoard,
  MarketplaceSpotlight,
} from "./components";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 dark:bg-slate-950">
      <main className="mx-auto w-full max-w-6xl space-y-8 px-6 md:px-8 lg:px-12 xl:px-24">
      <HeroSection />
        <section className="space-y-6">
        <KanbanBoard />
        <AgentQuickChat />
        </section>
          <ActivityPanel />
      <MarketplaceSpotlight />
      <CollaborationBar />
      <FooterSection />
      </main>
      <ChatWidget />
    </div>
  );
}
