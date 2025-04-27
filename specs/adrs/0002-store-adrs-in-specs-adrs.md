---
parent: Decisions
nav_order: 2
title: Store ADRs in specs/adrs
status: accepted
date: 2025-04-24
decision-makers: [Team (via democratic vote)]
consulted: []
informed: [All team members]
---

# Store ADRs in specs/adrs

## Context and Problem Statement

We need a consistent location for Architectural Decision Records so that all team members and future maintainers can easily find and version them alongside other specs.

## Decision Drivers

* Proximity to other spec documents  
* Clear separation from code  
* Alignment with course guidelines  

## Considered Options

* Google Docs  
* Slack
* Miro


## Decision Outcome

Chosen option: **`specs/adrs/`**, because our repository already has a `specs/` folder for planning artifacts, and ADRs conceptually fit under “specs.” Also, professor's documents recommend it to be pushed in the github.

### Consequences

* **Positive**:  
  - All planning documents live under `specs/`  
  - Easy to reference in our issue tracker and CI  
* **Negative**:  
  - None significant  

### Confirmation

We will create the directory in the repo and add this ADR file there. Subsequent ADRs will follow the same pattern (`0001-…`, `0002-…`, etc.).

## Pros and Cons of the Options

### docs/decisions/

* Good, because it follows typical ADR examples  
* Bad, because we’re already using Miro for a lot of the information holding of decisions.

### specs/adrs/

* Good, because it groups with other specs  
* Good, because naming is unambiguous  
* Neutral, because it’s a custom path (not a canonical ADR path)

## More Information

Future ADRs (e.g., technology, framework, CI/CD) will also live here for consistency.
