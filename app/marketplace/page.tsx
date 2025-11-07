import {
  AgentGrid,
  CreatorSpotlight,
  FeaturedCollections,
  FilterSidebar,
  FooterSection,
  HeroSection,
  TrustStrip,
} from "./components";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:px-8 lg:px-12 xl:px-24">
        <HeroSection />
        <FeaturedCollections />
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSidebar />
          <AgentGrid />
        </div>
        <TrustStrip />
        <CreatorSpotlight />
      </main>
      <div className="mx-auto mt-10 max-w-6xl px-6 md:px-8 lg:px-12 xl:px-24">
        <FooterSection />
      </div>
    </div>
  );
}
