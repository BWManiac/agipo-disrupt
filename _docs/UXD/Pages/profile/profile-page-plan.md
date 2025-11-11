# Profile Page – UX Plan

## Purpose
- Provide a single command center for a user or org to define who they are, what data they trust Agipo with, and how agents should act on their behalf.
- Translate connected context (data sources, preferences, goals) into actionable recommendations for workflows and marketplace agents.
- Establish governance guardrails: visibility, control, and auditability across agents and data.

## Primary Audience
- **Operations/Automation Leads:** configure data and policies so their teams can leverage agents safely.
- **Team Admins & Power Users:** maintain integrations, review recommendations, curate internal agent lineups.
- **Future Persona – AI Agencies:** manage client context profiles to deploy reusable playbooks.

## Top Tasks / User Stories
1. Connect or review data sources that describe my business (CRM, support desk, calendars, analytics, repositories).
2. Declare goals, KPIs, and operating constraints so Agipo agents can align recommendations.
3. View health/status of existing connections and fix issues quickly.
4. Discover ready-to-run workflows/agents tailored to my data and stated goals.
5. Assign which agents (owned or marketplace) can access specific context domains.
6. Audit past changes to the profile (new connections, permission changes, recommendations accepted).

## Information Architecture
1. **Snapshot Header** – Profile completeness score, last updated, owner. Surface critical alerts (e.g., expiring token) + quick action buttons.
2. **Identity & Goals** – Company profile, teams, key metrics, objectives, compliance settings.
3. **Context Fabric**
   - **Connections**: grouped by category with badges for data domains unlocked.
   - **Knowledge Assets**: documents, datasets, manual uploads, API endpoints, schemas.
   - **Signals & Events**: optional webhook/event sources, frequency, retention.
4. **Recommendations**
   - Suggested workflows (auto-generated drafts) with confidence indicators.
   - Suggested marketplace agents with “Works with your stack” tags.
   - “Unlock next” cards showing missing context needed for higher-value automations.
5. **Agent Access Control**
   - Permission matrix: agents × data domains.
   - Quick toggles for grant/revoke, plus tiered scopes.
6. **Activity & Audit** – Timeline of profile changes, recommendations accepted/ignored, agent runs triggered via profile context.
7. **Roadmap & Feedback** – “Coming soon” connectors, ability to request integrations or share goals.

## Key Interactions & States
- **Connection onboarding modal** guiding OAuth/API key entry, domain selection, test run, scoped permissions.
- **Editable goal chips** with natural-language editing (“Track weekly pipeline over $100k”).
- **Recommendation actions**: preview, accept (auto-configure workflow draft), dismiss with reason for learning loop.
- **Permission matrix bulk actions**: e.g., “Allow all revenue agents to use HubSpot data”.
- **Empty states**: highlight value of connecting first source, offer guided setup checklist.
- **Loading/error** states with inline retry and documentation links.

## Data & Technical Notes
- Integrate with future `connections` store slice + API; persist preferences alongside workflows.
- Recommendations sourced from orchestration analytics + marketplace metadata.
- Audit log should align with existing workflow activity logging format.
- Ensure PIIs flagged for masking; maintain compliance copy.

## Metrics of Success
- Profile completeness adoption rate.
- Number of active context-aware workflows/agents launched post-profile setup.
- Reduction in time-to-first-automation compared to unconfigured users.
- Connection health (uptime, refresh frequency) and permission churn.

## Open Questions
- Do we support multi-profile (e.g., per workspace) in MVP?
- How do we reconcile individual vs org preferences (hierarchy)?
- Should recommendations trigger notifications outside this page (email, in-app alerts)?
- What is minimum connector set for launch, and do we gate by tier?

## Next UX Deliverables
- Component inventory & wireflows for key tasks (connect new source, accept recommendation, adjust agent permissions).
- Collaboration with engineering on connection schema + audit trail format.
- Alignment with marketplace team on tagging agents by required context.
