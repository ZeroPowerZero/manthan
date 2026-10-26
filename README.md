# MANTHAN: PSYCHE (2026/27) — Interactive 3D Web Experience

> **"What does it mean to be human?"**
> A two-day youth festival in Jammu exploring the human psyche, mind, soul, and existence through dance, theatre, debate, live painting, and cognitive inquiry.

---

## ✦ Core Architectural Highlights

1. **Aesthetic: "Consciousness as Light"**
   - Pure `#17141F` Midnight canvas background — luminous human silhouettes glow against the deep cosmic dark with zero boxy cards.
   - Refractive 3D procedural human sculpture using `@react-three/fiber` and `@react-three/drei` with `MeshTransmissionMaterial` (frosted refractive glass/chrome) and inner additive rainbow Fresnel/prismatic cores (`#C13DD6`, `#4FD8E8`, `#F2B84B`).
   - Volumetric God-Rays radiating upwards from the mind and chest.
   - Interactive mouse-physics galaxy: 3,500+ custom GLSL stardust points with pointer velocity, lerped inertia, and fluid ripple dynamics.
   - Post-processing pipeline with Bloom (`luminanceThreshold: 0.25`, `intensity: 1.2`) and subtle Chromatic Aberration.
   - Buttery smooth inertia scrolling powered by **Lenis**.

2. **The 7-Act Vertical Journey**
   - **01. The Question (Hero):** Full-screen 3D interactive cosmos + editorial display typography in *Cormorant Garamond* and magnetic iridescent CTA.
   - **02. The Invitation (About):** 2-day festival ethos, 4 philosophical pillars, and the Mirrored Reflection ("Stillness" / Duality) water plane motif.
   - **03. The Experience (7 Interactive Event Portals):** Frameless glowing cards with 3D tilt:
     1. *Painting — The Inner Canvas* (90 mins, Individual)
     2. *Dance — Beyond Words* (3 mins/team, up to 6 members, 15 teams/day)
     3. *Theatre — Masks and Mirrors* (10 mins/team incl. set-up, up to 6 members, 15 teams/day)
     4. *Debate — The Question of Reality* (90 sec/speaker; marked with **"Capacity Being Finalised / Notify Me"** per Blueprint Section 07)
     5. *Academic Forum — Minds in Dialogue* (Interdisciplinary expert dialogues)
     6. *Research Forum — Ideas Into Inquiry* (50 shortlisted papers, 25/day, 7m talk + 3m defense)
     7. *Psychology Experiences — Reach Inward* (Non-diagnostic sensory stations, open mic, social night)
   - **04. The Minds (Guests & Partners):** "Awakening" cosmic motif with soft-glowing placeholders for confirmed psychologists, researchers, and adjudicators.
   - **05. The Programme (Day 1 & Day 2 Schedule):** High-readability dual-track timeline: **Main Auditorium** vs **Parallel Rooms**.
   - **06. Join the Experience (5-Pathway Registration Engine):** Multi-step registration drawer with `localStorage` draft saving and strict institutional validation.
   - **07. The Details (Rules, Eligibility & Trust Standards):** Zero-motion high-contrast accordion, 3-column "What We Provide" matrix, and Non-Diagnostic Educational Safeguard.

3. **Institutional Delegation System (Built for Schools & Colleges)**
   - Strict category quota enforcement:
     - **Painting:** Max 1 student
     - **Debate:** Max 2 debaters
     - **Theatre:** Max 1 team (up to 6 students)
     - **Dance:** Max 1 team (up to 6 students)
   - **Cross-Category Roster Deduplication:** Blocks a student from being registered in more than one category by Student ID and Name, preserving festival integrity.
   - Instant downloadable **Official Delegation Handbook** modal.

4. **Backend Readiness (`src/services/api.ts`)**
   - Clean async service interface generating unique reference numbers (`MANTHAN-2027-INST-XXXX`, `MANTHAN-2027-IND-XXXX`, etc.).
   - Persists drafts and completed submissions to `localStorage`.
   - Ready for a drop-in swap with Express, Supabase, Firebase, or PostgreSQL.

5. **Accessibility & Performance Guardrails**
   - Dynamic motion toggle: `[ ✦ Motion: ON/OFF ]` in the navbar and system `prefers-reduced-motion` detection that pauses shaders and renders the static high-res `<StillFallbackCanvas />`.
   - Clamped DPR `[1, 1.5]` and responsive particle counts for 60fps on mid-range phones.

---

## ✦ Tech Stack

- **Framework:** React 18 + Vite 5 + TypeScript
- **Styling:** TailwindCSS + Custom Iridescent Shaders & Gradients
- **3D & WebGL:** `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`
- **Inertia & Motion:** `lenis`, `gsap`, `framer-motion`
- **State Management:** `zustand` (with local persistence)
- **Icons:** `lucide-react`
- **Celebration Effects:** `canvas-confetti`

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview
```
