  
**USNS Administration Dashboard**

UI Development Phase — Complete Product Backlog

Next.js  ·  TypeScript  ·  Mock-Data Driven

Generated: May 30, 2026

# **Project Backlog Overview**

**Total Epics: 16   ·   Total Tickets: 73**

| Epic ID | Epic Title | Ticket Count | Priority Mix |
| :---- | :---- | ----- | :---- |
| **EPIC-01** | Project Foundation & Architecture Setup | **6** | 4 Critical · 2 High · 0 Medium |
| **EPIC-02** | Authentication & Authorization | **6** | 3 Critical · 3 High · 0 Medium |
| **EPIC-03** | Application Shell & Navigation | **4** | 2 Critical · 1 High · 1 Medium |
| **EPIC-04** | Main Dashboard & Analytics | **6** | 1 Critical · 2 High · 3 Medium |
| **EPIC-05** | Shared UI Component Library | **12** | 4 Critical · 7 High · 1 Medium |
| **EPIC-06** | User Management | **5** | 1 Critical · 4 High · 0 Medium |
| **EPIC-07** | Role & Permission Management | **3** | 0 Critical · 2 High · 1 Medium |
| **EPIC-08** | Academic Structure Management | **5** | 0 Critical · 5 High · 0 Medium |
| **EPIC-09** | Faculty & Staff Management | **2** | 0 Critical · 2 High · 0 Medium |
| **EPIC-10** | System Administration & Configuration | **3** | 0 Critical · 1 High · 2 Medium |
| **EPIC-11** | Notifications Center | **3** | 0 Critical · 2 High · 1 Medium |
| **EPIC-12** | Audit Logs & Monitoring | **3** | 0 Critical · 2 High · 1 Medium |
| **EPIC-13** | Reports & Analytics | **3** | 0 Critical · 1 High · 2 Medium |
| **EPIC-14** | Profile & Account Settings | **3** | 0 Critical · 2 High · 1 Medium |
| **EPIC-15** | Error Handling, System States & Error Pages | **5** | 2 Critical · 3 High · 0 Medium |
| **EPIC-16** | Mock Data Layer & API Integration Preparation | **4** | 2 Critical · 1 High · 1 Medium |

# **EPIC-01: Project Foundation & Architecture Setup**

| FOUND-01  |  Initialize Next.js Project with TypeScript and Core Tooling |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | None |
| **Description** | Set up the Next.js 14+ project with TypeScript, configure ESLint, Prettier, Tailwind CSS, and establish the full folder structure per the defined architecture. |  |  |
| **Acceptance Criteria** | Next.js 14+ project initialized with App Router and strict TypeScript enabled ESLint and Prettier configured with consistent rules and no warnings on an empty project Tailwind CSS installed and configured with a custom design token theme Full folder structure created per the enterprise architecture specification All environment variable files created with placeholder values and documented Git repository initialized with a meaningful .gitignore README documents local setup steps |  |  |

| FOUND-02  |  Global Type System and API Envelope Types |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-01 |
| **Description** | Define all shared TypeScript interfaces and types used across the application, including API response envelopes, pagination meta, error types, and role/permission enums. |  |  |
| **Acceptance Criteria** | ApiResponse\<T\> and PaginatedResponse\<T\> generic interfaces defined PaginationMeta interface defined matching Laravel pagination structure AppError interface and AppErrorCode union type defined covering all HTTP error scenarios UserRole, UserStatus, and Permission enums/types defined All global types exported from a single barrel index file Zero TypeScript errors on the type definitions |  |  |

| FOUND-03  |  Centralized API Client and Endpoint Registry |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-02 |
| **Description** | Build the centralized HTTP client with interceptors for auth header injection, token refresh handling, and unified error normalization. Define all API endpoints in a central registry. |  |  |
| **Acceptance Criteria** | API client created as a singleton with base URL sourced from environment config Request interceptor attaches Authorization bearer token when available Response interceptor maps all HTTP errors to the unified AppError structure ENDPOINTS registry object defines all feature endpoints — no raw URL strings elsewhere Mock mode flag in environment config can bypass real requests without code changes API client is not imported directly in pages or components — only in service layer |  |  |

| FOUND-04  |  Mock Data Infrastructure and Service Abstraction Pattern |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-03 |
| **Description** | Establish the pattern for mock services: define service interfaces, implement mock classes, and provide a factory/resolver that selects mock vs real based on environment config. |  |  |
| **Acceptance Criteria** | IService interface pattern documented and a reference implementation created MockServiceBase utility class provides simulated async delay Mock services return data shaped exactly to match Laravel API response envelopes Service resolver selects mock or real implementation based on NEXT\_PUBLIC\_MOCK\_MODE No mock imports exist in any component or page file All mock data stored under the dedicated mock directory |  |  |

| FOUND-05  |  Global State Management Setup |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-01 |
| **Description** | Initialize and configure the global state management solution (Zustand) with modular slices for UI state and the auth store. |  |  |
| **Acceptance Criteria** | Zustand installed and configured Auth slice created: stores token, authenticated user, and role UI slice created: sidebar open/close state, active theme Notification slice created: unread count, list All stores typed with strict interfaces — no implicit any Stores are modular; no single monolithic store file |  |  |

| FOUND-06  |  TanStack Query Provider and Global Query Configuration |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-01 |
| **Description** | Install and configure TanStack Query (React Query) as the data-fetching layer with global defaults for stale time, retry logic, and error handling. |  |  |
| **Acceptance Criteria** | QueryClient configured with appropriate staleTime and cacheTime defaults QueryClientProvider wraps the application at the root level Global onError callback routes errors to the toast notification system DevTools included in development mode only React Query is the sole data-fetching mechanism — no ad-hoc useEffect fetches |  |  |

# **EPIC-02: Authentication & Authorization**

| AUTH-01  |  Login Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-01, FOUND-04 |
| **Description** | Build the login page with email and password form, field-level validation, loading states, and error feedback. All interactions use mock auth service. |  |  |
| **Acceptance Criteria** | Login form contains email and password fields with Zod validation schema Email validates format; password validates minimum length Inline field errors display on blur and submit Submit button shows loading spinner and is disabled during request Invalid credentials error message displayed without exposing technical details Successful mock login stores token and user in auth store and redirects to dashboard Unauthenticated users are redirected to login; authenticated users are redirected away from login Page is responsive across desktop, tablet, and mobile breakpoints |  |  |

| AUTH-02  |  Forgot Password Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-01 |
| **Description** | Build the forgot password flow: email submission form that mocks sending a reset link, with appropriate success and error feedback. |  |  |
| **Acceptance Criteria** | Email input validates format before submission Loading state shown during mock request Success state shows a confirmation message with no email address exposure in URL Error state handles unknown email gracefully with a user-friendly message Link to return to login is clearly accessible Mock service simulates a delayed response |  |  |

| AUTH-03  |  Reset Password Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-02 |
| **Description** | Build the reset password form that accepts a new password and confirmation, validates them, and handles success/error states via mock service. |  |  |
| **Acceptance Criteria** | New password and confirm password fields with matching validation Password strength indicator shown Token present in URL is consumed by the mock service Invalid or expired token shows appropriate error page rather than a broken form Successful reset redirects to login with a success toast Loading and error states handled consistently |  |  |

| AUTH-04  |  Route Guard and Session Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-05, AUTH-01 |
| **Description** | Implement route protection that prevents unauthenticated access to all dashboard routes, handles session expiry, and redirects with appropriate feedback. |  |  |
| **Acceptance Criteria** | RouteGuard component wraps all protected layout routes Unauthenticated requests redirect to login with a return URL parameter Expired session (mock 401 response) triggers session-expired toast and redirect to login Auth token stored through the tokenStorage abstraction, never directly via localStorage in components Refresh token flow mocked and wired to the API client interceptor No flash of protected content before guard evaluation |  |  |

| AUTH-05  |  Role-Based Access Control and Permissions Hook |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | AUTH-04 |
| **Description** | Implement the permission system: usePermissions hook that exposes role-based checks, used throughout the UI to show/hide actions and protect routes by role. |  |  |
| **Acceptance Criteria** | usePermissions hook exposes can(permission) and hasRole(role) helpers Permission checks never use raw string comparisons in components Unauthorized access to a role-restricted page shows the 403 Forbidden screen Navigation items hide/show based on user role without layout shift Mock auth includes multiple mock users with different roles for testing Permission types are strictly typed — no string literals outside constants |  |  |

| AUTH-06  |  Session Expired, Unauthorized, and Permission Denied Screens |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-04 |
| **Description** | Create dedicated full-page screens for session expiry, 401 Unauthorized, and 403 Forbidden scenarios with clear messaging and navigation recovery actions. |  |  |
| **Acceptance Criteria** | 401 screen displays clear message with a login redirect action 403 screen displays a permission-denied message with a go-back action Session expired screen distinguishes itself from general 401 with specific copy All three screens follow the design system and dashboard layout shell Screens are reachable via the error handling system, not just direct URL access |  |  |

# **EPIC-03: Application Shell & Navigation**

| SHELL-01  |  Dashboard Layout Shell |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | AUTH-04 |
| **Description** | Build the main authenticated layout: sidebar navigation, top header bar, breadcrumb area, notification bell, and main content slot. |  |  |
| **Acceptance Criteria** | Layout renders sidebar, topbar, and main content area correctly on all breakpoints Sidebar collapses to icon-only mode on tablet; fully hidden on mobile with overlay drawer Active route is highlighted in the sidebar Layout is driven by a typed route config — no hardcoded nav items Topbar shows current user name, role badge, and notification bell Layout is the single wrapper — no duplicate layout code across pages |  |  |

| SHELL-02  |  Sidebar Navigation with Role-Based Menu Items |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | SHELL-01, AUTH-05 |
| **Description** | Build the sidebar navigation component that renders menu groups and items based on the authenticated user's role and permissions. |  |  |
| **Acceptance Criteria** | Nav items defined in a typed config, not hardcoded in the component Items hidden when the user lacks required permission — no visible disabled items for inaccessible routes Active state correctly reflects current route including nested child routes Nested sub-menus expand/collapse with smooth animation Sidebar state (open/collapsed) persists via the UI store Keyboard navigation works correctly through all nav items |  |  |

| SHELL-03  |  Top Header Bar |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | SHELL-01 |
| **Description** | Build the top header bar with sidebar toggle, breadcrumb display, global search trigger, notification bell, and user avatar menu. |  |  |
| **Acceptance Criteria** | Sidebar toggle button correctly triggers store state Breadcrumbs rendered from current route path with proper labels Notification bell shows unread badge count from notification store User avatar dropdown shows profile link, settings link, and logout action Logout action clears auth store and redirects to login Header is sticky and does not scroll with content |  |  |

| SHELL-04  |  Breadcrumb Component |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | SHELL-01 |
| **Description** | Build a dynamic breadcrumb component that auto-generates the path hierarchy from the current route, with support for custom labels. |  |  |
| **Acceptance Criteria** | Breadcrumbs generated from route segments automatically Custom labels supported via a route config map Dynamic segments (e.g., user ID) resolved to human-readable labels when entity is loaded Last segment is not a link; previous segments are clickable links Breadcrumb updates correctly on client-side navigation |  |  |

# **EPIC-04: Main Dashboard & Analytics**

| DASH-01  |  Main Dashboard Overview Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | SHELL-01, FOUND-04 |
| **Description** | Build the main dashboard landing page showing KPI statistic cards, a summary chart, recent activity feed, quick actions panel, and announcement banner. |  |  |
| **Acceptance Criteria** | Page composes reusable StatCard, ActivityFeed, QuickActions, and AnnouncementBanner components All data sourced from mock dashboard service — no hardcoded values in page or components Skeleton loaders shown while mock data is loading Error state displayed if mock service returns error Page layout is responsive — cards stack on mobile Each section can be individually refreshed |  |  |

| DASH-02  |  KPI Statistics Cards |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | DASH-01 |
| **Description** | Build the reusable StatCard component supporting a title, current value, trend indicator (up/down/neutral), percentage change, and icon. |  |  |
| **Acceptance Criteria** | StatCard accepts typed props: title, value, trend, changePercent, icon, isLoading Trend indicator renders correct directional icon with color (green up, red down) Skeleton state shown when isLoading is true Card is accessible with correct ARIA labels for screen readers Multiple StatCards render in a responsive grid without layout breakage |  |  |

| DASH-03  |  Analytics Charts Section |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | DASH-01 |
| **Description** | Build the analytics charts section using a lazily loaded charting library, supporting line charts, bar charts, and donut/pie charts with mock data. |  |  |
| **Acceptance Criteria** | Chart library loaded with next/dynamic to prevent SSR errors and reduce initial bundle At least three chart types implemented: line, bar, and donut Charts accept typed data props — no internal data fetching Charts are responsive and resize correctly with the container Legend and tooltips display correctly on hover Loading skeleton shown while chart module loads Charts accessible with descriptive ARIA labels and a data table fallback |  |  |

| DASH-04  |  Activity Feed Widget |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | DASH-01 |
| **Description** | Build the activity feed component that displays a timestamped list of recent system events with actor info, action type, and target entity. |  |  |
| **Acceptance Criteria** | Activity items render actor avatar/initials, action description, target, and relative timestamp Items are paginated or virtualized if list is long Empty state shown when no recent activity Loading skeleton shown during data fetch Action types distinguished by icon and color Feed refreshes on a configurable polling interval using React Query |  |  |

| DASH-05  |  Quick Actions Panel |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | DASH-01, AUTH-05 |
| **Description** | Build a quick actions panel on the dashboard that shows role-appropriate shortcuts for frequent tasks such as creating a user, generating a report, or sending announcements. |  |  |
| **Acceptance Criteria** | Actions defined in a typed config with required permission specified per action Actions not permitted for the current user role are not rendered Each action navigates or opens the correct modal/drawer Panel is keyboard navigable Actions include icon, label, and optional badge for counts |  |  |

| DASH-06  |  Announcements Banner and Center |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | SHELL-01, FOUND-04 |
| **Description** | Build the announcements system: a dismissible banner on the dashboard for critical announcements, and a full announcements center page listing all system announcements. |  |  |
| **Acceptance Criteria** | Dashboard banner shows the latest unread critical announcement if one exists Banner is dismissible and dismissed state persists in session Announcements center lists all announcements with title, date, author, and body Unread announcements visually distinguished from read ones Announcement detail view shows full content Mock data includes several announcements with varying priority levels |  |  |

# **EPIC-05: Shared UI Component Library**

| UI-01  |  Enterprise Reusable Data Table Component |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-02 |
| **Description** | Build a fully featured, generic, reusable DataTable component designed to handle all tabular data needs across every module in the dashboard. This is the single table implementation used everywhere. |  |  |
| **Acceptance Criteria** | Component accepts a typed columns config and a data array with generics Server-side pagination supported: accepts current page, total, per-page, and onPageChange callback Client-side sorting supported by column with sortable flag in column config Global search input filters rows client-side or triggers onSearch callback for server-side Per-column search filters configurable via column config Column visibility toggled via a column picker dropdown Row selection with checkboxes and a selectAll control Bulk actions bar appears when rows are selected, accepting a typed bulk actions config Export button triggers onExport callback — no direct file generation in the component Loading state renders per-row skeleton rows matching column count Empty state renders a customizable EmptyState component Error state renders a customizable ErrorState component with a retry callback Action column supports per-row actions with permission awareness Responsive: horizontally scrollable on mobile, with priority column pinning All column definitions, action configs, and row data are strictly typed |  |  |

| UI-02  |  Form Field Wrapper and Input Primitives |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-01 |
| **Description** | Build the FormField wrapper component that consistently renders a label, input slot, help text, and validation error message. Build all input primitive components (text, email, password, number, textarea). |  |  |
| **Acceptance Criteria** | FormField accepts label, name, error, helpText, required, and children slot Error message renders below the field with consistent styling and icon Required fields show an asterisk indicator Input primitives: TextInput, EmailInput, PasswordInput (with show/hide toggle), NumberInput, TextareaInput All inputs forward refs and accept all standard HTML input attributes via typed props Focus, hover, disabled, and error visual states implemented consistently All inputs accessible with proper ARIA attributes |  |  |

| UI-03  |  Select, Multi-Select, and Combobox Components |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-02 |
| **Description** | Build searchable single-select, multi-select, and combobox components suitable for role pickers, department selectors, status filters, and similar use cases throughout the dashboard. |  |  |
| **Acceptance Criteria** | SingleSelect supports searchable options with keyboard navigation MultiSelect supports multiple selection with removable chips/tags Combobox supports both typed input and option selection All components accept a typed options array: { label, value, disabled? } Loading state shown while options are fetching Empty state shown when no options match Components integrate with React Hook Form via Controller Fully accessible with ARIA combobox pattern |  |  |

| UI-04  |  Modal, Drawer, and Dialog Components |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-01 |
| **Description** | Build reusable Modal, side Drawer, and confirmation Dialog components used across all create/edit/delete flows in the dashboard. |  |  |
| **Acceptance Criteria** | Modal supports header, body, footer slots with configurable max-width Drawer slides in from the right; supports header, body, footer slots and configurable width ConfirmationDialog accepts title, description, confirm label, cancel label, and a destructive flag All three trap focus and restore focus on close ESC key and backdrop click close the overlay (configurable per instance) Scroll lock applied to body when overlay is open Stacking of multiple modals handled gracefully Accessible with ARIA dialog role and correct labelledby/describedby |  |  |

| UI-05  |  Button, Badge, and Status Indicator Components |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-01 |
| **Description** | Build the Button component with all variants and sizes, the Badge component for counts and labels, and the StatusBadge component for entity status display. |  |  |
| **Acceptance Criteria** | Button variants: primary, secondary, outline, ghost, destructive Button sizes: sm, md, lg Button accepts leading/trailing icon slots Button loading state shows spinner and disables interaction Badge variants: default, success, warning, error, info with typed color map StatusBadge accepts a status value and maps it to label and color via a typed config All components accessible with appropriate ARIA attributes |  |  |

| UI-06  |  Date Picker and Date Range Picker |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-02 |
| **Description** | Build a date picker and date range picker component suitable for filter panels, form fields, and report generation flows. |  |  |
| **Acceptance Criteria** | DatePicker shows a calendar popover with month/year navigation DateRangePicker supports selecting start and end dates with a dual-calendar view Both components integrate with React Hook Form via Controller Min and max date constraints supported Clear button resets selection Display format configurable via a format prop Keyboard navigable calendar grid |  |  |

| UI-07  |  Toast Notification System |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-01 |
| **Description** | Build a global toast notification system for success, error, warning, and info messages, callable from anywhere via a hook. |  |  |
| **Acceptance Criteria** | useToast hook exposes success(), error(), warning(), info() methods Toasts render in a fixed portal at the top-right corner Each toast auto-dismisses after a configurable duration Toasts manually dismissible via a close button Maximum visible toast count configurable; older ones queue Toast renders icon, title, optional description, and optional action button Accessible: announced to screen readers via live region |  |  |

| UI-08  |  Pagination Component |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01 |
| **Description** | Build a reusable pagination component that works with the DataTable and any paginated list view, supporting page navigation and page-size selection. |  |  |
| **Acceptance Criteria** | Renders prev/next buttons and numbered page links with ellipsis for large page counts Current page highlighted clearly Per-page size selector with configurable options (10, 20, 50, 100\) Total results count displayed Fully controlled via page and onPageChange props Accessible with ARIA navigation landmark |  |  |

| UI-09  |  Loading Skeleton Components |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-01 |
| **Description** | Build a suite of skeleton loading components: generic Skeleton block, SkeletonText, SkeletonCard, SkeletonTable, and SkeletonForm for consistent loading states across the dashboard. |  |  |
| **Acceptance Criteria** | Base Skeleton component accepts width, height, and borderRadius props SkeletonText accepts lines count and varying widths SkeletonCard renders a card-shaped skeleton with configurable rows SkeletonTable renders skeleton rows matching the number of visible columns All skeletons use CSS animation for shimmer effect Skeletons respect the user's prefers-reduced-motion setting |  |  |

| UI-10  |  Empty State and Error State Components |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-01 |
| **Description** | Build reusable EmptyState and ErrorState components used by the DataTable and all list/detail pages to communicate the absence of data or a failure gracefully. |  |  |
| **Acceptance Criteria** | EmptyState accepts icon, title, description, and optional action button props ErrorState accepts title, description, optional retry callback, and optional error code Both components visually distinct from each other and from loading states Variants for in-page (within a card) and full-page display All text content externalized — no hardcoded strings in components |  |  |

| UI-11  |  Tabs Component |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | FOUND-01 |
| **Description** | Build a Tabs component used on detail pages and settings sections, supporting URL-synced active tab state. |  |  |
| **Acceptance Criteria** | Tabs renders a tab list and panel with keyboard navigation (arrow keys) Active tab synchronizable with URL query param for deep linking Lazy rendering of tab panel content supported (render on first activation) Tabs can be disabled individually Accessible with ARIA tablist, tab, and tabpanel roles |  |  |

| UI-12  |  Search and Advanced Filter Panel |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-02, UI-03, UI-06 |
| **Description** | Build a global search bar component and a reusable advanced filter panel component that can be configured per module with different filter fields. |  |  |
| **Acceptance Criteria** | GlobalSearch component opens a search overlay/modal with instant results preview FilterPanel accepts a typed filters config and renders appropriate input per field type (text, select, date range, checkbox) Active filter count badge shown on the filter toggle button Applied filters displayed as removable chips below the search/filter bar Clear all filters action resets all filter state Filter state serializable to URL query params for shareable/bookmarkable filtered views |  |  |

# **EPIC-06: User Management**

| USER-01  |  Users List Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | UI-01, FOUND-04 |
| **Description** | Build the users management list page using the reusable DataTable, with search, filter by role and status, pagination, and row actions for view, edit, and status change. |  |  |
| **Acceptance Criteria** | DataTable configured with user-specific columns: name, email, role, status, created date, actions Filter panel includes role filter (multi-select) and status filter Row actions: View Profile, Edit User, Deactivate/Activate, Delete (with confirmation dialog) Bulk actions: activate, deactivate, delete selected Create User button opens the create user drawer All data sourced from mock user service Permission-aware: destructive actions hidden for users without delete permission |  |  |

| USER-02  |  Create User Drawer |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | USER-01, UI-04 |
| **Description** | Build the create user form inside a Drawer component with fields for full name, email, role, department, and initial password, with full Zod validation. |  |  |
| **Acceptance Criteria** | Form fields: full name, email, role (select), department (select), temporary password, force password change toggle Zod schema validates all fields with appropriate rules Field-level errors displayed inline Role select options sourced from mock roles service Department select options sourced from mock departments service Success: drawer closes, table refreshes, success toast shown Error: form remains open, API error mapped to field errors or global error message Submit button disabled and loading during request |  |  |

| USER-03  |  Edit User Drawer |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | USER-02 |
| **Description** | Build the edit user drawer pre-populated with the selected user's current data, supporting updates to all editable fields. |  |  |
| **Acceptance Criteria** | Drawer pre-populates all fields from the selected user record Email field editable with uniqueness validation behavior (mock) Role change triggers a confirmation step if demoting own role Dirty state detection: save button enabled only when changes exist Success/error handling consistent with create flow Loading state while fetching user data before form renders |  |  |

| USER-04  |  User Detail / Profile View Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | USER-01 |
| **Description** | Build the user detail page showing full profile info, role and permissions summary, activity history, and account status with quick action buttons. |  |  |
| **Acceptance Criteria** | Profile section shows avatar (initials fallback), full name, email, role badge, status badge, join date Permissions section lists granted permissions grouped by category Activity tab shows user's recent actions from mock audit log Account section shows last login, login count, failed attempts Edit button opens the edit user drawer Deactivate/Activate button with confirmation dialog Breadcrumb navigates back to user list |  |  |

| USER-05  |  User Status Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | USER-01 |
| **Description** | Implement activate, deactivate, and suspend user status flows with confirmation dialogs and appropriate feedback. |  |  |
| **Acceptance Criteria** | Status change requires confirmation dialog describing the action and its consequences Loading state shown during mock request Status badge in table and detail view updates optimistically, then confirms on success Error reverts optimistic update and shows error message Status change logged in the mock audit trail Bulk status change supported from the DataTable bulk actions bar |  |  |

# **EPIC-07: Role & Permission Management**

| ROLE-01  |  Roles List Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01, FOUND-04 |
| **Description** | Build the roles management list page showing all system roles with name, description, user count, and actions. |  |  |
| **Acceptance Criteria** | DataTable configured with columns: role name, description, user count, created date, actions Row actions: View, Edit, Delete (system roles protected from deletion) Create Role button opens create role drawer System roles clearly labeled and edit-restricted Filter by name search supported |  |  |

| ROLE-02  |  Create and Edit Role Drawer with Permission Assignment |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | ROLE-01 |
| **Description** | Build the create/edit role form with name, description, and an interactive permission assignment matrix grouped by resource. |  |  |
| **Acceptance Criteria** | Form fields: role name, description Permission matrix renders permissions grouped by resource category (Users, Roles, Reports, etc.) Each permission row has a checkbox; select-all per group supported Permissions typed from the global Permission enum — no raw strings Dirty state detection on edit Success/error handling consistent with other forms |  |  |

| ROLE-03  |  Permission Matrix Visualization |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | ROLE-01 |
| **Description** | Build a read-only permission matrix view comparing all roles across all permissions, useful for auditing access control. |  |  |
| **Acceptance Criteria** | Matrix renders roles as columns and permissions as rows (or vice versa) Checkmark/cross icons indicate grant/deny per cell Filterable by permission group Horizontally scrollable on smaller screens with frozen first column Exportable as CSV via the standard export mechanism |  |  |

# **EPIC-08: Academic Structure Management**

| ACAD-01  |  Colleges / Faculties List and Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01, FOUND-04 |
| **Description** | Build the colleges/faculties management module: list page with DataTable, create/edit drawer, and detail view. |  |  |
| **Acceptance Criteria** | List page shows: college name, dean, department count, student count, status, actions Create/edit form: name, code, dean (user select), description, status Detail view shows college info plus linked departments and assigned dean Deactivating a college warns about impact on sub-departments Search and filter by status supported |  |  |

| ACAD-02  |  Departments List and Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | ACAD-01 |
| **Description** | Build the departments management module linked to colleges, with full CRUD and hierarchical display. |  |  |
| **Acceptance Criteria** | List filterable by parent college Create/edit form: name, code, college (select), head of department (user select), description Department detail view shows linked courses and staff count Breadcrumb reflects college \> department hierarchy |  |  |

| ACAD-03  |  Academic Programs Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | ACAD-02 |
| **Description** | Build the academic programs module for creating, editing, and managing degree programs linked to departments. |  |  |
| **Acceptance Criteria** | List page: program name, type (Bachelor/Master/PhD), department, duration, status Create/edit form with full program details Program detail view shows enrolled students count and courses Status management with confirmation |  |  |

| ACAD-04  |  Academic Years and Semesters Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-04 |
| **Description** | Build the academic calendar module for managing academic years and their semester periods. |  |  |
| **Acceptance Criteria** | Academic year list with active year clearly indicated Create year with start/end date validation Semester management within each year: name, type, start/end dates Activate/close semester with impact warning if active registrations exist Cannot delete years with linked data |  |  |

| ACAD-05  |  Courses Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | ACAD-02 |
| **Description** | Build the courses management module with full CRUD, prerequisite configuration, and department assignment. |  |  |
| **Acceptance Criteria** | List: course code, name, credit hours, department, status Create/edit: code, name, credit hours, description, department, prerequisites (multi-select) Prerequisite circular dependency validation Course detail shows sections and enrollment summary |  |  |

# **EPIC-09: Faculty & Staff Management**

| FAC-01  |  Faculty Members List and Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01, ACAD-02 |
| **Description** | Build the faculty management module with full CRUD for academic staff members linked to departments and courses. |  |  |
| **Acceptance Criteria** | List: name, employee ID, department, specialization, rank, status Create/edit form: personal info, academic rank, department, assigned courses Detail view: full profile, assigned courses this semester, publications count Workload indicator showing credit hours assigned |  |  |

| FAC-02  |  Administrative Staff Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01 |
| **Description** | Build the administrative staff module for non-academic staff linked to departments and offices. |  |  |
| **Acceptance Criteria** | List: name, employee ID, department/office, position, status Create/edit form with role assignment Detail view showing department, position, and access permissions summary |  |  |

# **EPIC-10: System Administration & Configuration**

| SYS-01  |  System Settings Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-05 |
| **Description** | Build the system settings page for DBA/admin users covering general settings, mail configuration, storage settings, and feature flags. |  |  |
| **Acceptance Criteria** | Settings organized into tabbed sections: General, Mail, Storage, Security, Features Each section is a separate form with its own save action Changes require confirmation before saving to mock service Settings values loaded from mock service on page load Sensitive fields (passwords, keys) masked with show/hide toggle Settings page access restricted to DBA and admin roles |  |  |

| SYS-02  |  Backup and Maintenance Mode Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | SYS-01 |
| **Description** | Build the backup management UI and maintenance mode toggle accessible to DBA users. |  |  |
| **Acceptance Criteria** | Backup schedule configuration with last backup status indicator Manual backup trigger with progress indication Maintenance mode toggle with a double-confirmation step Maintenance mode shows a prominent warning banner while active Backup history list with timestamps and status |  |  |

| SYS-03  |  Email Template Management |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | SYS-01 |
| **Description** | Build the email template management module for viewing and editing system email templates used by notifications and automated messages. |  |  |
| **Acceptance Criteria** | List of all system email templates with category and last modified date Edit view with a rich text or code editor for template body Template variables listed and explained for each template Preview mode renders template with sample data Reset to default option per template |  |  |

# **EPIC-11: Notifications Center**

| NOTIF-01  |  Notification Center Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | SHELL-01, FOUND-04 |
| **Description** | Build the full notifications center page with read/unread management, category filtering, and bulk actions. |  |  |
| **Acceptance Criteria** | List all notifications with: icon (by type), title, description, timestamp, read/unread state Filter by category (system, academic, security) and read status Mark as read / mark as unread per item Mark all as read bulk action Delete notification with confirmation Notification count in topbar bell synced with unread count from store Clicking a notification navigates to the related entity when applicable |  |  |

| NOTIF-02  |  Notification Preferences Settings |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | NOTIF-01 |
| **Description** | Build the notification preferences screen where users can configure which notification types they receive and via which channels. |  |  |
| **Acceptance Criteria** | Preferences grouped by notification category Toggle for each notification type: in-app, email Changes saved per-type to mock service Reset to defaults option available |  |  |

| NOTIF-03  |  Notification Bell Dropdown |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | NOTIF-01 |
| **Description** | Build the notification bell dropdown in the topbar showing the latest unread notifications with quick actions. |  |  |
| **Acceptance Criteria** | Shows up to 5 most recent unread notifications Each item: icon, title, relative time, mark-as-read button Footer link navigates to full notification center Unread count badge on bell icon Dropdown closes on outside click or ESC Real-time unread count updates from store |  |  |

# **EPIC-12: Audit Logs & Monitoring**

| AUDIT-01  |  Audit Log List Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | UI-01, FOUND-04 |
| **Description** | Build the audit log viewer with advanced filtering, search, and export for compliance monitoring. |  |  |
| **Acceptance Criteria** | DataTable columns: timestamp, actor, action, resource type, resource ID, IP address, result Filter panel: date range, actor (user search), action type, resource type, result (success/fail) Drill-down to detail view showing full payload diff Export to CSV/Excel Read-only — no edit or delete actions on audit records Access restricted to admin and DBA roles |  |  |

| AUDIT-02  |  Login History Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-05 |
| **Description** | Build the login history page showing all authentication events with device/location details. |  |  |
| **Acceptance Criteria** | List: timestamp, user, IP address, browser/device, location (country/city), result Filter by user, date range, and result (success/failed/blocked) Failed login attempts highlighted in red Suspicious activity indicators (multiple failures, unusual location) Export supported |  |  |

| AUDIT-03  |  System Events Log |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | AUDIT-01 |
| **Description** | Build the system events log showing infrastructure-level events: service restarts, config changes, backup events, maintenance mode toggles. |  |  |
| **Acceptance Criteria** | Events categorized: system, security, configuration, backup Severity level indicator per event Filter by category, severity, and date range Detail view for each event with full context payload |  |  |

# **EPIC-13: Reports & Analytics**

| RPT-01  |  Reports Dashboard |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | DASH-03, FOUND-04 |
| **Description** | Build the reports landing page with a categorized report catalog, recently generated reports list, and quick report generation shortcuts. |  |  |
| **Acceptance Criteria** | Report catalog organized by category: academic, administrative, system, financial Each report card shows: name, description, last generated date, generate button Recent reports list shows last 10 generated reports with download links Report generation triggers mock async job with a loading state Download mock files in CSV format |  |  |

| RPT-02  |  Enrollment Statistics Report |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | RPT-01 |
| **Description** | Build the enrollment statistics report with chart visualizations and data table, filterable by college, program, year, and semester. |  |  |
| **Acceptance Criteria** | Filter panel: academic year, semester, college, program Summary cards: total enrolled, new enrollments, withdrawals, completion rate Bar chart showing enrollment trend over semesters Data table with drill-down by department Export to CSV and print-friendly view |  |  |

| RPT-03  |  User Activity and System Usage Report |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | RPT-01 |
| **Description** | Build the system usage report showing active users over time, login frequency, feature usage, and peak usage periods. |  |  |
| **Acceptance Criteria** | Line chart of daily active users over selected date range Table of top active users by action count Feature usage breakdown by module Peak hours heatmap visualization Date range filter: last 7 days, 30 days, 90 days, custom range |  |  |

# **EPIC-14: Profile & Account Settings**

| PROF-01  |  My Profile Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-04 |
| **Description** | Build the authenticated user's own profile page showing personal info, role, department, and editable profile fields. |  |  |
| **Acceptance Criteria** | Displays avatar (with upload option), full name, email, role, department, join date Inline edit for: display name, phone, bio Avatar upload with preview and crop (mock — no actual upload) Changes saved to mock profile service Success toast on save |  |  |

| PROF-02  |  Change Password Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | AUTH-04 |
| **Description** | Build the change password form with current password verification, new password, and confirmation fields. |  |  |
| **Acceptance Criteria** | Current password, new password, confirm new password fields New password meets strength requirements (validated by Zod) Password strength meter shown in real-time Current password field error shown for wrong current password (mock) Success: redirects to profile with success toast |  |  |

| PROF-03  |  Account Settings and Preferences |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | PROF-01 |
| **Description** | Build account settings covering language, timezone, date format preferences, and theme selection. |  |  |
| **Acceptance Criteria** | Language selector (UI only — no actual i18n required in this phase) Timezone selector Date format preference Theme selector: light / dark / system Preferences saved to mock service and applied immediately |  |  |

# **EPIC-15: Error Handling, System States & Error Pages**

| ERR-01  |  Global Error Boundary |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-02 |
| **Description** | Implement a React Error Boundary that catches unhandled rendering errors, displays a user-friendly fallback, and logs errors for future observability integration. |  |  |
| **Acceptance Criteria** | Error boundary wraps the entire application below the layout Fallback UI shows a friendly error message with a retry/reload button Error details (message, stack) logged to console in development; prepared for external logging service hook Boundary resets on navigation to a new route Does not expose raw error stack to end users in production |  |  |

| ERR-02  |  404 Not Found Page |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | SHELL-01 |
| **Description** | Build a polished 404 page for unmatched routes within the dashboard. |  |  |
| **Acceptance Criteria** | Friendly message with illustration Navigation buttons: Go to Dashboard, Go Back Renders within the dashboard layout shell (sidebar, header visible) Accessible with correct page title |  |  |

| ERR-03  |  HTTP Error Pages (400, 403, 409, 422, 429, 500, 502, 503\) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | ERR-01 |
| **Description** | Create dedicated error screen components for each major HTTP error class, triggered by the global error handling system. |  |  |
| **Acceptance Criteria** | 400 Bad Request: user-friendly message suggesting to check input 403 Forbidden: permission denied message with go-back action 409 Conflict: conflict explanation with suggested resolution action 422 Validation Error: field-level errors surfaced from Laravel error response format 429 Too Many Requests: rate limit message with countdown timer before retry 500 Server Error: generic server error with retry button 502/503 Service Unavailable: maintenance/downtime message with auto-retry All screens accessible from the error handling system, not only direct URL access |  |  |

| ERR-04  |  Laravel Validation Error Response Handler |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-03 |
| **Description** | Build the utility that maps Laravel 422 validation error responses (field-keyed errors array) to React Hook Form field errors, usable across all forms. |  |  |
| **Acceptance Criteria** | Utility function accepts a Laravel errors object and a React Hook Form setError function Maps each field key to the corresponding form field name Supports nested field names (e.g., address.city) Multiple errors per field joined and displayed Remaining global errors (non-field) displayed as a form-level error message Fully typed — no any usage |  |  |

| ERR-05  |  Network Error and Offline State Handling |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-03 |
| **Description** | Implement detection and graceful handling of network errors and offline states with user feedback and automatic retry. |  |  |
| **Acceptance Criteria** | Network connectivity loss detected and an offline banner displayed Banner dismisses automatically when connection is restored Failed requests during offline state queued or retried on reconnect React Query retry configuration differentiates network errors from API errors |  |  |

# **EPIC-16: Mock Data Layer & API Integration Preparation**

| MOCK-01  |  Mock Data Sets for All Modules |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | FOUND-04 |
| **Description** | Create comprehensive, realistic mock data sets for all modules: users, roles, academic structure, faculty, audit logs, notifications, reports, and settings. |  |  |
| **Acceptance Criteria** | Each module has a dedicated mock data file with at least 20 realistic records Mock users represent all role types: president, dean, dba, admin, faculty, staff Mock academic data covers 3 colleges, 10 departments, 20 programs, 50 courses Mock audit logs cover all action types with varied actors and timestamps All mock data is typed to the same interfaces used by the service layer No mock data imported in any component or page |  |  |

| MOCK-02  |  Mock Service Implementations for All Modules |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Critical** | **Dependencies** | MOCK-01 |
| **Description** | Implement mock service classes for every module service interface, simulating realistic API behavior including pagination, filtering, and error responses. |  |  |
| **Acceptance Criteria** | Every IService interface has a corresponding MockService implementation Mock services simulate network delay (configurable, default 200-500ms) Pagination logic implemented in mock services to return correct slices Filtering and search implemented client-side in mock services Error scenarios simulatable via a mock error flag in development tools Service resolver switches between mock and real based on env flag |  |  |

| MOCK-03  |  DTO Types and Response Transformer Preparation |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **High** | **Dependencies** | FOUND-02 |
| **Description** | Define Data Transfer Object types matching Laravel API response shapes, and build transformer functions that map API DTOs to application domain models. |  |  |
| **Acceptance Criteria** | DTO types defined separately from domain model types Transformer functions map DTO → domain model for each entity Transformers handle date string → Date conversion consistently Transformers handle null/undefined → optional field mapping During mock phase, transformers receive mock data directly During real API phase, only the data source in the service changes — transformers remain unchanged |  |  |

| MOCK-04  |  API Integration Readiness Checklist and Documentation |  |  |  |
| :---- | :---- | :---- | :---- |
| **Priority** | **Medium** | **Dependencies** | MOCK-03 |
| **Description** | Create a developer-facing checklist and documentation artifact that specifies exactly what changes are required per module to switch from mock to real API. |  |  |
| **Acceptance Criteria** | Document lists every mock service file and its corresponding real service replacement Endpoint mappings documented per service method Auth token requirements documented per endpoint Known breaking differences between mock response shape and expected Laravel response flagged Integration order recommended based on dependencies |  |  |

