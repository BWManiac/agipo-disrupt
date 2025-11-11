# Tools Table

| Column | Type | Description | Notes |
| --- | --- | --- | --- |
| id | string | Unique identifier for the tool. | Human-readable slug preferred; used by agents and runtime. |
| name | string | Display name shown to users and in docs. | Keep concise and action-oriented. |
| description | string | Summary of what the tool does. | Optional; supports UX copy. |
| invocation | object | Contract describing input/output expectations. | Minimal JSON schema or interface reference. |
| runtime | string | Execution context required (e.g., "webcontainer", "http"). | Helps orchestrator resolve handler. |

## Purpose
- Provide a normalized place to describe the capabilities agents can call.
- Keep the schema compact enough for JSON mocks while capturing execution intent.
- Enable the "agents are defined by their tools" worldview with clear references.

## Rationale & Notes
- `invocation` holds the shape of the expected payload/response; starts as a plain object so we can evolve toward richer validation later.
- Separating `runtime` lets us route the tool to the correct execution environment without overloading the invocation contract.
- `description` mirrors the agents table pattern, giving us UX flexibility without making it mandatory.

## Open Questions / Next Iterations
- Should we formalize `invocation` as a Zod schema, TypeScript type reference, or JSON Schema string to enable validation?
- Do we need a `version` field to manage tool upgrades without breaking existing agents?
- How will we represent authentication or secrets requirements (per tool vs. shared policies)?
- Is there value in tagging tools (e.g., domain, category) for marketplace browsing or agent auto-assembly?

## Example Record (TBD)
- Will revisit once we sketch how the orchestrator consumes `invocation` and `runtime` to avoid premature details.
