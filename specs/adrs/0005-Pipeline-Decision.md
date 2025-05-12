---
parent: Decisions
nav_order: 5
title: Use GitHub Actions for CI/CD Pipeline
status: accepted
date: 2025-05-10
decision-makers: [Backend + Infrastructure Subgroup (lead: Ryan Ni)]
consulted: [Frontend team, PM]
informed: [All team members]
---

Use GitHub Actions for CI/CD Pipeline

## Context and Problem Statement
Our CSE110 team needed a reliable, integrated CI/CD solution to automate linting, testing, building, and deploying our web application. The pipeline must integrate with our existing GitHub-based workflow and support Node.js-based environments.

## Decision Drivers
- Compatibility with GitHub and Node.js
- Automated testing, linting, and builds
- Low overhead for setup and maintenance
- Reusability across future sprints
- Free for student/public repositories

## Considered Options
- GitHub Actions
- CircleCI
- No CI/CD (manual testing and deployment)
- Custom shell scripts and webhooks

## Decision Outcome
**Chosen option: GitHub Actions**

It supports all required workflow steps (including testing, linting, and deployment) directly from GitHub. The pipeline is written in YAML and runs inside a Node.js Docker container on an Ubuntu base. A deployment script via SSH is in place but may be modified as the server configuration evolves.

## Consequences

**Positive:**
- Code is automatically tested and linted on each push or PR
- Consistent builds and early error detection
- Seamless integration with GitHub and team workflows
- Free tier sufficient for our project needs

**Negative:**
- Requires all contributors to write testable and clean code
- SSH-based deployment depends on proper key setup and may need debugging

## Confirmation
The pipeline is defined in `.github/workflows/main.yml` and already runs on `push` and `pull_request` events targeting the `master` branch. It includes `npm ci`, ESLint, tests, and builds. A deployment step via `appleboy/ssh-action` is included but still being finalized.

## Pros and Cons of the Options

**GitHub Actions**
- ✅ Native to GitHub, easy to use
- ✅ Free and customizable
- ❌ Some limitations in debugging failed workflows

**CircleCI**
- ✅ Strong config flexibility
- ❌ Requires external integration and account setup
- ❌ Limited free plan

**No CI/CD**
- ✅ Simple, no setup needed
- ❌ Risk of untested or broken code reaching `main`

## More Information
Ryan Ni implemented the initial YAML-based GitHub Actions workflow, including documentation for key decisions. More information can be found in the repo under `.github/workflows` and `docs/pipeline/`.
