# AI Resume Maker — Custom UI/UX Design Brief

Overview
- Project: AI Resume Maker — a premium, approachable AI-first resume builder focused on speed, clarity, and conversion.
- Goal: Deliver a unique, production-ready UI/UX design package (Figma-ready) that emphasizes minimal cognitive load, fast onboarding, and high-conversion flows for students, grads, and professionals.

Design Philosophy
- Minimalist, calm, and confident: reduce noise, highlight action, and let AI suggestions feel helpful rather than prescriptive.
- Personality: professional, friendly, subtle playful — trustworthy for early-career users and respected by recruiters.
- Visual language: soft glass surfaces, subtle depth, tactile micro-shadows, and a restrained accent palette.

Key Style Tokens
- Typography: Inter for UI, Poppins for headings (optional), system fallback stack.
- Core palette:
  - Surface: #FFFFFF (pure), #F6F8FB (soft)
  - Accent: #3B82F6 (blue), #7C3AED (violet)
  - Neutral: #111827 (primary text), #6B7280 (muted)
  - Success: #10B981, Warning: #F59E0B, Danger: #EF4444
  - Glass tint: rgba(255,255,255,0.6)
- Motion: subtle transitions, 180–260ms standard, reduced motion alternative.

Layout & Grid
- 12-column responsive grid (desktop), 8-column (tablet), single column (mobile).
- 16px base padding with 8px vertical rhythm increments.
- Card radius scale: small 6px, medium 12px, pill 999px.

Core Pages & Unique UX Elements
1) Landing (Conversion-Focused)
   - Clear hero: short headline, 2-line benefit statement, primary CTA `Create Resume`, secondary `Browse Templates`.
   - Quick-demo strip: 3-step visual of Generate → Edit → Export.
   - Template showcase: interactive thumbnails with ATS badge.
   - Social proof: real metrics + short testimonials.

2) Auth & Onboarding
   - Split-screen for desktop: branded visual + short explainer on left, auth form on right.
   - Fast account creation: email + optional social OAuth (Google, LinkedIn, GitHub).
   - Minimal onboarding flow: 3 quick questions to tailor templates (role, experience level, industry).

3) Home / Dashboard
   - Action-first layout: primary CTA `New Resume` prominent.
   - Quick insights: GPA of ATS scores, recent downloads, suggested templates.
   - Spotlight panel: `Resume performance` with last ATS score and quick-fix suggestions.

4) AI Resume Builder (Core Experience)
   - Left: compact multi-step navigation (collapsible). Center: form-centric inputs. Right: live preview canvas.
   - Inline AI composer: lightweight suggestion chip beside each form field (hover to expand). Actions: Accept, Edit, Re-generate.
   - Realtime diff preview: show how a suggestion changed content with a soft-highlight animation.
   - Reorder via drag handles; templates adapt to content length.

5) Templates Gallery
   - Filter-first gallery (role, industry, tone, free/premium).
   - Hover preview: quick full-screen preview modal with sample content replaced by user sample.

6) Editor & Theming
   - Two-pane editor: controls + preview. Theme modal with instant preview changes.
   - Typography and spacing presets (Compact, Balanced, Airy).
   - Export modal: choose format, page size, and ATS-optimized export options.

7) AI Career Assistant
   - Conversational UI with suggested prompts and one-click actions (apply suggestion to resume, generate cover letter, mock interview Q&A).
   - Context-awareness: assistant reads current resume and offers line-level suggestions.

8) ATS Insights
   - Score breakdown: readability, keywords, format, contact info.
   - Action list: prioritized suggestions (one-click apply to accept or preview changes).

Components & Patterns (Figma Library)
- App shell: top navigation, collapsible sidebar, contextual toolbars.
- Cards: stats, resume preview, template.
- Forms: stacked forms with helper text and inline validation.
- AI chips: compact suggestion chips with icon + micro-actions.
- Stepper: linear and non-linear variants with progress percentage.
- Modal system: accessible modals + slide-over drawers for editor controls.
- Loading / Empty states: animated skeletons and encouraging CTAs.

Interactions & Motion Guidance
- Hover and focus: subtle lift + color shift. Hover scale 1.02 for interactive cards.
- Acceptance animations: soft fade + confetti Lottie for milestone actions (first resume created, first export).
- Drag and drop: lift with shadow and placeholder ghost.

Accessibility & Performance
- WCAG AA for text; primary CTA AA+ contrast target.
- Keyboard-first interactions for stepper, editor, and assistant chat.
- Images and animations optimized; Lottie used sparingly with fallback static image.

Content Tone & Microcopy
- Tone: concise, encouraging, expert-friendly.
- Example strings:
  - Hero: "Build a Professional Resume in Minutes with AI"
  - Empty state: "No resumes yet — start with a template or AI generate one."
  - Suggestion action: "Improve this bullet for clarity and impact."

Deliverables
- A single Figma file with:
  - Design tokens (colors, type, spacing) exported as JSON.
  - Component library with variants.
  - High-fidelity frames: Landing, Auth, Dashboard, Builder (3 steps), Editor, Templates, ATS Insights, Assistant, Settings (desktop + mobile for key screens).
  - Interaction prototype covering core flows.
- Asset pack: SVG icon set, Lottie animation placeholders, export-ready PNGs.
- Handoff docs: CSS variable mapping, accessibility checklist, and a short dev notes.md.

Acceptance Criteria
- Figma file contains reusable components and tokens.
- Core flows prototyped and testable.
- Accessibility checklist included and token contrast validated.

Next Steps (I can do now)
- Add a README link to this brief.
- Generate example Figma frames (basic wireframes) as SVGs in `/design/`.

Tell me which next step you want: add README link or generate initial wireframe assets?
