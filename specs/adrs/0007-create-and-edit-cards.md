---
parent: Decisions
nav_order: 7
title: Creating and editing decks and cards on the same page
status: accepted
date: 2025-05-21
decision-makers: [Design Subgroup]
consulted: [Frontend team, Backend team, PM]
informed: [All team members]
---

# Users will create and edit decks and cards on the same page

## Context and Problem Statement
When creating our Figma design, we needed to design the user experience when creating versus editing decks and cards.

## Decision Drivers
- Ease and intuitiveness for user
- Simplifying our website design
- Streamlining the code implementation

## Considered Options
- Separate pages for creating a deck/card and editing a deck/card
- A pencil symbol that brings the user to a deck/card edit page, where they can either input new info or edit old info. 


## Decision Outcome
**Chosen option: A single create/edit page**

The user can have their info and preferences saved from a previous session, which the page and display and allow for current edits or new info inputs.

## Consequences

**Positive:**
- Creating and editing cards and decks is easy and intuitive to the user
- Stored information is utilized effectively to streamline the user experience
- The user interface is more simplified

**Negative:**
- Requires more complicated implementation of local storage

## Confirmation
Decision posted in Slack and the Figma and frontend/backend implementation will be updated accordingly.
