import {
  ActivityPanel,
  AgentQuickChat,
  ChatWidget,
  CollaborationBar,
  FooterSection,
  HeroSection,
  KanbanBoard,
  MarketplaceSpotlight,
  MetricsOverview,
  PromptPanel,
} from "./components";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-100">
      <HeroSection />
      <MetricsOverview />
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12 md:px-8 lg:px-12 xl:px-24">
        <KanbanBoard />
        <AgentQuickChat />
        <div className="grid gap-6 lg:grid-cols-2">
          <PromptPanel />
          <ActivityPanel />
        </div>
      </section>
      <MarketplaceSpotlight />
      <CollaborationBar />
      <FooterSection />
      <ChatWidget />
    </div>
  );
}
