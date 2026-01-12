# 7 Days Student Life Simulation — Phase 2 (React Refactor) ⚛️

This repository contains the **React-based refactor** of a Tamagotchi-style life simulation game originally implemented using JavaScript and jQuery.

The goal of Phase 2 was **architectural improvement**, not feature expansion.

**Related Links:**
- [**Phase 1 (JavaScript + jQuery implementation)**](https://github.com/ChristoAW/UTSPTI)
- [**Demo Video (Phase 2)**](https://www.youtube.com/watch?v=ejCFahUXWqM )

---

## 🎯 Refactor Objectives

- Migrate from DOM-driven logic to **state-driven architecture**
- Improve readability and maintainability
- Make stat interactions easier to reason about
- Experiment with **React Hooks** and component-based design
- Prepare the system for safer iteration and extension

---

## 🧠 Architectural Focus

### State-Centric Design
All gameplay logic was centralized using React state and hooks, replacing scattered jQuery event handlers.

This improved:
- Predictability of stat updates
- Debuggability
- Separation of concerns between logic and UI

---

### ⏱ Time & Event Modeling
- Centralized in-game time progression
- Explicit handling of:
  - hourly updates
  - daily refresh cycles
  - semester-based evaluations
- Continuous evaluation of game-over conditions

---

### 🧩 Component Modularization
- UI components decoupled from simulation logic
- Player actions modeled as explicit state transitions
- Reduced coupling between features

---

### 🌐 External API Integration
- Integrated News API to simulate daily in-game news updates
- API refresh tied to in-game day progression, not real-time
- Reinforced time-based state thinking

---

## 👥 Team & Ownership

- **Role:** Team Lead & Primary Developer
- Implemented the majority of gameplay and refactor logic
- Coordinated feature alignment based on Phase 1 standards

---

## 🚀 Running the Project

```bash
npm install
npm start
```
## 📌 Notes
- Developed as part of an academic course project
- UI prioritizes functional clarity over visual polish
- This repository emphasizes refactoring, state management, and architectural learning
