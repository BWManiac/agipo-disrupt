# Marketplace Page – Planning Draft

## Page Goals
- Showcase the breadth and quality of available agents while making “hire/add to workspace” the default next step.
- Reduce evaluation friction by surfacing trust signals, performance metrics, and key workflows inline.
- Provide clear entry points into detail views and hiring flows for both new prospects and existing customers.
- Encourage ongoing marketplace engagement through curated collections, personalization, and collaboration cues.

## Primary Audience
- **Evaluators & team leads** assessing solutions for specific use cases (support, ops, finance).
- **Existing workspace members** expanding their automation footprint or upgrading agents.
- **Marketplace shoppers** (net-new visitors) exploring what AGIPO can provide before signing up.
- **Agent creators/partners** wanting visibility into how their listings are presented (secondary).

## Entry Points & Context
- Hero CTAs from the home page (`Browse marketplace`) or empty states inside the app.
- Deep links from marketing campaigns, blog posts, or category landing pages.
- In-app navigation when a user selects “Add agents” from workspace views.
- Cross-linking from agent detail pages (related agents) and collaboration mentions.

Each path should orient the user quickly: show breadcrumb, selected filters, or personalized recommendations when available.

## Core User Flows
1. **Browse & discover:** scan featured collections, search, or filter to a relevant shortlist.
2. **Evaluate fit:** compare cards, open preview details, review metrics and ratings, understand required integrations.
3. **Hire/Add to workspace:** initiate “Add” action, configure required permissions or data connections, confirm assignment.
4. **Share or bookmark:** copy link, recommend to teammates, save for later (if available).
5. **Creator journey (future):** submit agent, manage listing (out of scope for v1 but note dependencies).

## Layout Overview
1. **Marketplace Header**
   - Page title (“Agent Marketplace”), supporting copy emphasizing trust & transparency.
   - Global search bar with typeahead (agents, categories, creators).
   - Quick stats: total agents, categories, active workspaces using marketplace.
   - View toggle (grid/list) and sort control (Most popular, Newest, Highest rated).

2. **Featured Collections Carousel**
   - Horizontally scrollable banners (e.g., “Customer Support Essentials”, “Finance Automation”).
   - Each banner shows 2–3 key agents, CTA to view collection.

3. **Filter & Refinement Panel**
   - Persistent left rail on desktop, collapsible panel on mobile.
   - Filter groups: Use Case, Department, Complexity Level, Data Sources, Pricing (free/paid), Rating threshold, Creator type (AGIPO verified / Partner / Community).
   - Active filters displayed as chips with clear “Clear all” option.

4. **Agent Listings Grid/List**
   - Cards show: agent name, tagline, creator, verified badge, rating + usage count, success rate, avg runtime, last updated.
   - Highlight key capabilities, required inputs (data sources), and quick action `Add to workspace`.
   - Hover/expanded state reveals mini metrics chart and primary workflow steps (nodes).

5. **Inline Preview Drawer / Modal**
   - Triggered by clicking agent card; shows description, screenshots, node graph thumbnail, requirements, pricing, reviews.
   - “Hire” CTA persists; secondary `View full details` link to agent detail page.

6. **Hiring Confirmation Panel**
   - Slide-over triggered from `Add to workspace`.
   - Steps: choose workspace/environment, review required permissions, connect data sources, optional configuration (prompt tweaks), confirm adoption.
   - Success state surfaces next steps (launch agent, schedule run, view status).

7. **Trust & Testimonials Strip**
   - Quotes from verified customers, compliance badges (SOC 2, ISO), reminder that agents run in-browser.

8. **Creator Spotlight / Resources**
   - Highlight top creators or partner agencies.
   - Links to “Submit an agent”, “Marketplace guidelines”, community resources.

9. **Footer**
   - Standard global footer plus marketplace-specific links (Policies, Compliance, Refund/licensing terms).

## UI & Interaction Guidance
- Maintain scannability: consistent card height, clear typographic hierarchy, crisp iconography for tags.
- Search should support synonyms and recent searches; show empty state guidance when no results.
- Filters animate smoothly; show count of matching agents after filter adjustments.
- `Add to workspace` should be prominent but not overwhelming; disabled state with tooltip if user lacks permissions.
- Ratings displayed as numeric + stars; include visual indicator for verified reviews.
- Use skeleton loaders for card grid to reinforce perceived performance.

## Data & Content Requirements
- Agent metadata schema: name, slug, short description, long description, creator info, categories, tags, verification status.
- Performance metrics: success rate, average runtime per task, recent execution volume, uptime.
- Licensing info: pricing tier (free, subscription, usage-based), trial availability.
- Integrations & dependencies: required APIs, credentials, data sources.
- Review content: average rating, count, top 3 review snippets.
- Assets: cover image, node graph thumbnail, icon/avatar.
- Personalization signals: workspace favorites, previously hired agents, recommended for you.

## Hiring Experience Requirements
- Support both immediate add (no config) and guided setup (permissions, environment selection).
- Clearly communicate what happens post-hire (agent appears in workspace, initial run scheduled, etc.).
- Provide fallback messaging if agent requires manual approval or payment.
- Allow users to invite collaborators during confirmation (assign owners).

## Trust, Compliance & Transparency
- Verified creator badge with tooltip explaining vetting process.
- Clear data handling statement (“Runs in your browser via WebContainers; no data leaves your workspace unless…”) near CTAs.
- Audit info: last updated, changelog highlights, security endorsements.
- Surface support channel for each agent (maintainer contact).

## Analytics & Success Metrics
- Track search usage, filter engagement, card impressions vs hire conversions.
- Capture drop-off points in the hire flow (preview, permissions, confirmation).
- Monitor collection performance and personalized recommendation click-through.
- Measure marketplace NPS and review submission rate.

## Dependencies & Open Questions
- Need finalized agent metadata + API endpoints for listings, search, and metrics.
- Clarify pricing/licensing model and payment integration (if monetized at launch).
- Determine personalization scope (does v1 ship with generic collections only?).
- Align with agent detail page structure for shared components.

## Next Steps
- Validate layout with design wireframes (desktop + mobile responsive behaviors).
- Partner with data/backend teams on marketplace API contract (search, filters, metrics, hire flow).
- Draft placeholder content (sample agents, testimonials) for hi-fi mock.
- Define success metrics baseline and analytics events with product analytics team.
- Once plan approved, move to detailed wireframes and Agent Detail page planning.


