---
parent: Decisions
nav_order: 6
title: Do not use Yelp API
status: rejected
date: 2025-05-16
decision-makers: [Team]
consulted: [Backend Team]
informed: [All team members]
---

# Decided not to use Yelp API

## Context and Problem Statement
Our team wanted to use the Yelp API for restaurant data on our website, however, we were informed by TAs that APIs shold be avoided. 

## Decision Drivers
- Website would be tested against network failure
- TAs advised against APIs
- Added dependencies/costs from implementing API

## Considered Options
- Use Yelp API
- Scrape Yelp data manually
- Use small dataset (i.e. dining halls)

## Decision Outcome
**Chosen option: No Yelp API, use small dataset**

It's easier and safer for the team to implement, with the opportunity to expand datasets later. 

## Consequences

**Positive:**
- Less risk of network failure
- No outside dependency or extra cost
- Easier to implement when initally creating the website

**Negative:**
- Dataset of restaurants must be manually created
- Set of possible restaurants for cards is smaller
