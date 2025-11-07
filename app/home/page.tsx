import {
  ActivityPanel,
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
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-12 xl:px-24">
        <KanbanBoard />
        <div className="flex flex-col gap-6">
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
