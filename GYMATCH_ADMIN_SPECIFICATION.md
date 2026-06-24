# GYMATCH ADMIN PANEL — Technical Specification

> Version 1.0.0 | Last updated: 2026-06-24
> This document is the permanent technical source of truth for the GYMatch Admin Panel project.

---

## 1. Project Overview

GYMatch Admin Panel is a web-based administration dashboard that provides operational control over the GYMatch fitness platform. It allows platform administrators to monitor key performance metrics, manage user accounts, and maintain the gym category taxonomy that powers the mobile application.

The panel is a **standalone React SPA** (Single Page Application) with no backend dependency. All data is currently managed in-memory via mock services, designed for seamless replacement with real API calls.

---

## 2. Business Goals

| Goal | Description |
|---|---|
| Platform Governance | Give admins visibility into user behaviour and content |
| Content Quality | Maintain accurate category taxonomy for mobile discoverability |
| User Safety | Enable rapid suspension of abusive or fraudulent accounts |
| Operational Intelligence | Surface real-time KPIs for investor reporting |
| Scalability Foundation | Lay a clean architecture for backend integration |

---

## 3. Scope

**In Scope:**
- Admin authentication (login / logout)
- Dashboard analytics (KPI cards, recent users, activity feed, top gyms)
- User management (list, search, filter, suspend, activate, delete)
- Category management (create, read, update, delete with modal forms)
- Responsive layout (desktop sidebar + mobile drawer)
- Protected routing

**Out of Scope:**
- Gym management (planned future module)
- Real-time notifications (WebSocket)
- Role-based access control with multiple admin types
- Audit log persistence
- Backend/API integration (abstracted via services layer)

---

## 4. Architecture Overview

```
Browser
  └── React SPA (Vite)
        ├── React Router DOM (Client-side routing)
        ├── Global CSS (Tailwind v4 + custom design tokens)
        ├── Pages (Dashboard, Users, Categories, Login)
        ├── Layouts (AdminLayout wraps protected pages)
        ├── Components (Reusable UI primitives)
        ├── Hooks (useAuth — authentication state)
        ├── Services (authService, userService, categoryService)
        └── Data (mockData.js — mock dataset)
```

**Pattern:** Feature-page architecture. Each page owns its state; services abstract data access; components are stateless presentational units.

---

## 5. Folder Structure

```
gymatch-admin/
├── public/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # Reusable UI components
│   │   ├── Avatar.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── Table.jsx
│   ├── data/
│   │   └── mockData.js      # All mock data (users, categories, stats, activity)
│   ├── hooks/
│   │   └── useAuth.js       # Authentication state hook
│   ├── layouts/
│   │   └── AdminLayout.jsx  # Persistent sidebar + navbar shell
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Users.jsx
│   │   └── Categories.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   └── userService.js
│   ├── styles/
│   │   └── index.css        # Global styles + Tailwind import + design tokens
│   ├── App.jsx              # Router root
│   └── main.jsx             # React DOM entry point
├── index.html
├── package.json
├── vite.config.js
└── GYMATCH_ADMIN_SPECIFICATION.md
```

---

## 6. Routing Architecture

| Route | Component | Access |
|---|---|---|
| `/login` | `Login.jsx` | Public |
| `/` | Redirects to `/dashboard` | Protected |
| `/dashboard` | `Dashboard.jsx` | Protected |
| `/users` | `Users.jsx` | Protected |
| `/categories` | `Categories.jsx` | Protected |
| `*` (wildcard) | Redirects to `/dashboard` | Protected |

**ProtectedRoute logic:** Reads auth state from `localStorage` via `authService.isAuthenticated()`. Unauthenticated requests redirect to `/login` with `replace` (no back-button loop).

**AdminLayout nesting:** All protected routes render inside `AdminLayout` as nested routes via React Router's `<Outlet />`. This ensures the sidebar and navbar are mounted once and persist across navigation without remounting.

---

## 7. Component Architecture

### Presentational Components (stateless)

| Component | Props | Purpose |
|---|---|---|
| `StatCard` | `label, value, trend, icon, accent` | KPI metric card with trend indicator |
| `Avatar` | `initials, size` | Coloured initials avatar (deterministic colour from initials) |
| `PageHeader` | `title, subtitle, action` | Consistent page title + optional action button |
| `SearchBar` | `value, onChange, placeholder` | Controlled search input with icon |
| `Table` | `columns, data, emptyMessage` | Flexible data table with column render functions |
| `Modal` | `title, onClose, children, maxWidth` | Accessible modal overlay (Escape key closes) |
| `ConfirmModal` | `title, message, onConfirm, onCancel, danger` | Confirmation dialog (danger = red variant) |

### Layout Components (stateful)

| Component | State | Purpose |
|---|---|---|
| `Sidebar` | — | Navigation links + logout; mobile drawer via `open` prop |
| `Navbar` | — | Page title (derived from route), notifications button, admin avatar |
| `AdminLayout` | `sidebarOpen: bool` | Composes Sidebar + Navbar + Outlet |

---

## 8. State Management Strategy

**No global state library is used.** State is co-located with the component that owns it:

- **Authentication state** — `useAuth` hook reads/writes `localStorage` via `authService`. The hook is instantiated in `App.jsx` and `logout` is passed as a prop to `AdminLayout → Sidebar`.
- **Page-level state** — Each page manages its own data array, search string, filter value, and modal visibility via `useState`. Async operations use `useEffect` with service calls.
- **No prop drilling beyond 2 levels** — If state needs to go deeper, it should be lifted to a React Context or a lightweight state manager like Zustand.

**Future extension:** When backend integration occurs, replace the service functions with `fetch`/`axios` calls. Consider React Query (`@tanstack/react-query`) for server state caching, loading states, and cache invalidation.

---

## 9. UI Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#0A0A0B` | Page background, input background |
| Surface | `#18181C` | Cards, modals, sidebar |
| Border | `#2A2A30` | Card borders, table dividers, input borders |
| Border Muted | `#64646C` | Placeholder text, disabled states |
| Accent | `#D9FF00` | Primary CTA, active nav, KPI highlights |
| Text | `#FFFFFF` | Primary body text |
| Text Muted | `#8A8A94` | Labels, secondary text, table headers |
| Success | `#22C55E` | Active status badge |
| Danger | `#FF4444` | Suspended badge, delete actions |
| Warning | `#F59E0B` | Star ratings |

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Page headings | Bebas Neue | 400 | 3rem–5rem (via `font-heading` class) |
| Section headings | Bebas Neue | 400 | 1.25rem–2rem |
| Body | Inter | 400/500 | 0.875rem–1rem |
| Labels | Inter | 600 | 0.7rem (uppercase, tracked) |
| Mono (table ranks) | System monospace | 400 | 0.875rem |

### Spacing

- Base unit: 4px (Tailwind scale)
- Cards: 24px padding (`p-6`)
- Page: 32px padding (`p-8` on desktop, `p-6` on mobile)
- Section gaps: 24px–32px

### Component Patterns

- **Cards**: `background: #18181C`, `border: 1px solid #2A2A30`, `border-radius: 12px`
- **Buttons (primary)**: `background: #D9FF00`, `color: #0A0A0B`, `border-radius: 8px`
- **Buttons (ghost)**: `border: 1px solid #2A2A30`, transparent background
- **Inputs**: Dark background `#0A0A0B`, focus ring `#D9FF00`
- **Modals**: Backdrop blur, `#18181C` surface, 16px border-radius
- **Badges**: Pill shape, colour-coded background tint + border

---

## 10. Dashboard Module

### Components Used
- `StatCard` × 4 (Total Gyms, Total Users, Active Users, Top Gym Views)
- Inline recent users table
- Activity feed list
- Most Viewed Gyms table

### Data Sources
- `mockStats` — KPI numbers and trend percentages
- `mockUsers.slice(0, 6)` — Most recently joined users
- `mockActivityFeed` — Platform events (joins, suspensions, category changes)
- `mockTopGyms` — Ranked by view count

### Layout
- Grid: `1col → 2col → 4col` KPI row
- Lower section: `1col → 3col` (2/3 recent users + 1/3 activity feed)
- Full-width top gyms table

---

## 11. User Management Module

### Features
- Fetch all users from `userService.getAll()`
- Filter by name/email (client-side search)
- Filter by status (`all | active | suspended | inactive`)
- Suspend active user → `userService.updateStatus(id, 'suspended')`
- Activate non-active user → `userService.updateStatus(id, 'active')`
- Delete user → `userService.delete(id)` (with confirmation modal)
- All destructive actions require `ConfirmModal` confirmation

### Table Columns
`User (avatar + name)` | `Email` | `Status (badge)` | `Joined` | `Gym Visits` | `Actions`

### Status Values
- `active` → green badge
- `suspended` → red badge
- `inactive` → grey badge

---

## 12. Category Management Module

### Features
- List all categories as cards (icon, name, description, gym count)
- Search by category name
- Create category via modal form
- Edit category via pre-populated modal form
- Delete category with confirmation modal
- Form validation: name and description are required

### Form Fields
| Field | Type | Validation |
|---|---|---|
| Name | Text input | Required |
| Description | Textarea | Required |
| Icon | Emoji picker (10 options) | Default: 🏋️ |
| Color | Colour swatches (8 options) | Default: #D9FF00 |

### Default Categories
Gym, CrossFit, Yoga, MMA, Women Only

---

## 13. Reusable Component Library

### `StatCard`
```jsx
<StatCard
  label="Total Users"
  value={2048}
  trend={8.7}         // positive = green arrow up, negative = red arrow down
  icon={RiUserLine}
  accent="#A855F7"    // optional colour override for icon + value
/>
```

### `Table`
```jsx
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> }
];
<Table columns={columns} data={rows} emptyMessage="No results." />
```

### `Modal`
```jsx
<Modal title="Edit Item" onClose={() => setOpen(false)} maxWidth="520px">
  {/* form content */}
</Modal>
```

### `ConfirmModal`
```jsx
<ConfirmModal
  title="Delete User"
  message="This cannot be undone."
  danger            // red variant
  onConfirm={handleDelete}
  onCancel={() => setConfirm(null)}
/>
```

### `Avatar`
```jsx
<Avatar initials="JD" size={36} />
// Colour is deterministic from initials — same initials always render same colour
```

---

## 14. API Contract Definitions

When backend is integrated, replace service methods with these API contracts:

### Auth

```
POST /api/admin/login
Body: { email: string, password: string }
Response: { token: string, user: { id, name, email, role } }

POST /api/admin/logout
Headers: Authorization: Bearer <token>
Response: 204 No Content
```

### Users

```
GET /api/admin/users?search=&status=&page=&limit=
Response: { data: User[], total: number, page: number }

PATCH /api/admin/users/:id/status
Body: { status: 'active' | 'suspended' | 'inactive' }
Response: User

DELETE /api/admin/users/:id
Response: 204 No Content
```

### Categories

```
GET /api/admin/categories
Response: Category[]

POST /api/admin/categories
Body: { name, icon, description, color }
Response: Category

PUT /api/admin/categories/:id
Body: { name, icon, description, color }
Response: Category

DELETE /api/admin/categories/:id
Response: 204 No Content
```

### Category Object Shape
```json
{
  "id": 1,
  "name": "CrossFit",
  "icon": "⚡",
  "description": "High-intensity functional training boxes",
  "color": "#FF6B35",
  "gymCount": 63
}
```

### User Object Shape
```json
{
  "id": 1,
  "name": "Alex Rivera",
  "email": "alex.rivera@gmail.com",
  "status": "active",
  "joinDate": "2024-01-15",
  "avatar": "AR",
  "role": "user",
  "gymVisits": 48
}
```

---

## 15. Error Handling Strategy

| Scenario | Handling |
|---|---|
| Login failure | `useAuth` sets `error` string, displayed inline in form |
| Form validation | Client-side `validate()` function returns error object, displayed per-field |
| Service errors | Currently swallowed (mock services don't throw). Add try/catch + toast notifications when backend is live |
| Network errors | To be handled in service layer with retry logic |
| 401 Unauthorized | Intercept in API client, call `authService.logout()`, redirect to `/login` |
| 404 routes | Wildcard `*` route redirects to `/dashboard` |

**Recommended pattern for backend integration:**
```js
// services/apiClient.js
async function request(url, options) {
  const res = await fetch(url, { ...options, headers: { Authorization: `Bearer ${getToken()}` } });
  if (res.status === 401) { authService.logout(); window.location.href = '/login'; }
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

---

## 16. Security Considerations

| Risk | Mitigation |
|---|---|
| XSS | React's JSX escaping prevents DOM injection by default. Never use `dangerouslySetInnerHTML`. |
| CSRF | Token-based auth (JWT Bearer) is CSRF-resistant. No cookie-based sessions. |
| Token storage | Currently using `localStorage`. For higher security, move to `httpOnly` cookies when backend exists. |
| Route protection | `ProtectedRoute` component gates all admin routes. JWT expiry validation should happen server-side. |
| Sensitive data | No PII is logged to console. Remove all `console.log` before production. |
| Input validation | All forms validate client-side before submission. Server-side validation is mandatory when backend is wired. |

---

## 17. Troubleshooting & Debugging Guide

### App doesn't start after `npm run dev`

1. Ensure Node.js ≥ 18 is installed
2. Run `npm install` if `node_modules` is missing
3. Check for port conflicts on 5173

### Login redirects back to login

- Check `localStorage` in DevTools for key `gymatch_admin_auth`
- Demo credentials: `admin@gymatch.com` / `admin123`
- The `ProtectedRoute` calls `authService.isAuthenticated()` which reads from `localStorage`

### Tailwind classes not applying

- This project uses Tailwind CSS v4 with CSS-first configuration
- The `@import "tailwindcss"` directive in `src/styles/index.css` is the entry point
- Do NOT create `tailwind.config.js` — it's not used in v4
- Ensure `src/styles/index.css` is imported in `main.jsx`

### Icons not found (MISSING_EXPORT)

- This project uses `react-icons` v5.x
- Some icon names changed from v4. Use aliased imports: `import { RiFlashlightLine as RiZapLine } from "react-icons/ri"`
- Search available icons at: https://react-icons.github.io/react-icons/icons/ri/

### Build fails with lightningcss warnings about `@theme`

- These warnings are cosmetic — Tailwind v4 uses `@theme` which lightningcss doesn't recognise as standard CSS
- The build still succeeds. Upgrade to a lightningcss version that supports Tailwind v4 when available.

---

## 18. Performance Guidelines

- **Code splitting**: React Router's lazy loading (`React.lazy + Suspense`) should be added for each page when the bundle grows
- **Image optimisation**: Use WebP format for any uploaded gym images in future modules
- **Virtualisation**: When user list exceeds 500 rows, replace `Table` with `react-window` or `TanStack Virtual`
- **Memoisation**: Wrap expensive derived data (filtered users, category stats) in `useMemo`
- **Icon tree-shaking**: Import icons individually (`from "react-icons/ri"`) — Vite's rolldown bundler tree-shakes unused exports automatically

---

## 19. Scalability Roadmap

### Phase 2 — Backend Integration
- Replace all service methods with real API calls using `fetch` or `axios`
- Add React Query for server state management
- Implement JWT authentication with refresh tokens
- Move auth token to `httpOnly` cookie

### Phase 3 — Gym Management Module
- New route: `/gyms`
- Features: list, add, edit, delete gyms; assign category; upload images; view analytics
- Gyms have: name, address, coordinates, category, images, operating hours, contact

### Phase 4 — Analytics Enhancement
- Replace mock chart with recharts or Chart.js
- User growth line chart (monthly)
- Gym views bar chart
- Category distribution donut chart
- Geographic heatmap via Mapbox/Leaflet

### Phase 5 — Notifications & Audit Log
- Real-time event feed via WebSocket
- Persistent audit log (admin actions stored server-side)
- Push notification broadcasting to mobile users

### Phase 6 — Multi-Admin RBAC
- Admin roles: `super_admin`, `moderator`, `read_only`
- Route-level and action-level permission gates
- Admin user management sub-module

---

## 20. Developer Handoff Notes

### Installation
```bash
git clone <repo-url>
cd gymatch-admin
npm install
npm run dev       # Development server on http://localhost:5173
npm run build     # Production build to /dist
npm run preview   # Preview production build
```

### Environment Variables
Currently none. When backend is added:
```
VITE_API_URL=https://api.gymatch.com/v1
VITE_APP_ENV=production
```
All `import.meta.env.VITE_*` variables are inlined at build time by Vite.

### Key Files to Know
| File | Role |
|---|---|
| `src/data/mockData.js` | Replace with API calls when backend is ready |
| `src/services/authService.js` | Swap `localStorage` for httpOnly cookies + real endpoint |
| `src/styles/index.css` | Design tokens + global styles. Source of truth for theming |
| `src/routes/ProtectedRoute.jsx` | Auth gate — add role checks here for RBAC |
| `src/hooks/useAuth.js` | Authentication state — extend for token refresh |

### Naming Conventions
- **Files**: PascalCase for components (`StatCard.jsx`), camelCase for hooks/services (`authService.js`)
- **Components**: PascalCase functions with default export
- **State variables**: `camelCase` (e.g., `sidebarOpen`, `statusFilter`)
- **CSS classes**: Tailwind utility classes + semantic custom classes (`.card`, `.btn-primary`, `.badge-active`)
- **Icon imports**: Prefix `Ri` (RemixIcon), aliased when name changed: `import { RiFlashlightLine as RiZapLine }`

---

## 21. AI Development Context

### System Purpose
GYMatch Admin Panel is a dark-themed, enterprise-grade React admin dashboard for managing the GYMatch fitness platform. It has four modules: Login, Dashboard, Users, and Categories. It runs entirely client-side with mock data.

### Architecture Decisions
- **No Redux / Zustand**: State is page-local because modules don't share state. If cross-module state becomes necessary, add Zustand (not Redux — lower boilerplate).
- **No TypeScript**: Intentional for MVP velocity. Add TypeScript in Phase 2 with strict mode.
- **Tailwind v4**: CSS-first config via `@theme` block in `index.css`. No `tailwind.config.js`. Use `@import "tailwindcss"` at the top of the CSS file.
- **Services layer**: All data access goes through `src/services/`. Pages never call APIs directly. This isolates the integration surface for future backend work.
- **Nested routing**: `AdminLayout` wraps protected pages via `<Outlet />`. Login is outside this layout and renders its own full-page UI.

### Data Flow
```
User Action
  → Page handler (e.g., handleStatusChange)
  → Service call (userService.updateStatus)
  → Local state update (setUsers)
  → Re-render
```

### Component Patterns
- Pages: large, own local state, orchestrate layout
- Components: small, receive all data via props, no side effects
- Hooks: encapsulate stateful logic with side effects

### Design Language
- Background `#0A0A0B` (near-black)
- Accent `#D9FF00` (neon yellow-green — the GYMatch brand colour)
- Headings in Bebas Neue (athletic, bold)
- Body in Inter (clean, professional)
- Cards have border, no shadow — Linear/Vercel-inspired aesthetic
- Confirmation modals for all destructive actions

### Future Extension Guidelines
When adding a new module (e.g., Gym Management):
1. Create `src/pages/Gyms.jsx`
2. Create `src/services/gymService.js` with CRUD stubs
3. Add mock data to `src/data/mockData.js`
4. Register the route in `App.jsx` under the protected layout
5. Add the nav link to `src/components/Sidebar.jsx`
6. Follow the same pattern as `Users.jsx` or `Categories.jsx`

**Paste this entire document into Claude, ChatGPT, Cursor, Windsurf, Gemini, or GitHub Copilot and ask it to add a new module — it will understand the full architecture without needing to read the codebase.**

---

*GYMatch Admin Panel · Technical Specification v1.0.0*
*Generated for the GYMatch engineering team.*
