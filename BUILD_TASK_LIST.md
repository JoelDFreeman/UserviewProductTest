# ARS UserView Approvals - Build Task List

**Purpose:** Convert the TestUserView app to match the exact layout and interactions of the Figma file (ARS_WebUI2_User-View-Approvals). This app allows users to manage Active Roles profiles and approve/request access to resources.

**Target:** `approval` page in the Active Roles vertical

---

## Phase 1: Project Setup & Dependencies

- [ ] **1.1** Install dependencies and verify `pnpm install` completes successfully
- [ ] **1.2** Verify Iris shell builds locally (`pnpm build`)
- [ ] **1.3** Start dev server and verify it runs without errors (`pnpm dev`)
- [ ] **1.4** Verify Figma MCP connection is active and can access design
- [ ] **1.5** Review verticals.ts and confirm "approval" page is disabled - prepare to enable it

---

## Phase 2: Approval Page Layout & Main Components

### 2.1 Main Content Area Structure
- [ ] **2.1.1** Create `src/iris-shell/src/views/ApprovalPage/ApprovalPage.tsx` as a new page component
- [ ] **2.1.2** Wire the "approval" route in router.ts and enable it in verticals.ts
- [ ] **2.1.3** Import AppShell and set correct breadcrumb/header for approval context
- [ ] **2.1.4** Create main content wrapper with correct padding and max-width

### 2.2 Title & Description Section
- [ ] **2.2.1** Add page title: "My Access"
- [ ] **2.2.2** Add page description: "Manage your time-based access requests and permissions"
- [ ] **2.2.3** Create action buttons row (right-aligned):
  - Button: "Request Access" (primary action)
  - Button: "View History" (secondary action)

### 2.3 Statistics Cards Row
- [ ] **2.3.1** Create 4 stat cards component with correct spacing (Iris Tokens):
  1. **Active Access:** Count=4 | "Current permissions"
  2. **Pending Approval:** Count=2 | "Awaiting review"
  3. **Inactive:** Count=1 | "Expired access"
  4. **Revoked:** Count=1 | "Access withdrawn"
- [ ] **2.3.2** Each card displays count, label, description, and colored indicator dot
- [ ] **2.3.3** Verify card styling matches Iris design system tokens (colors, fonts, spacing)

---

## Phase 3: Access Records Table

### 3.1 Table Structure & Tabs
- [ ] **3.1.1** Create data table with tabs for filtering by status:
  - Tab 1: "All Access (8)" - default/active
  - Tab 2: "Active (4)"
  - Tab 3: "Pending (2)"
  - Tab 4: "Inactive (1)"
  - Tab 5: "Revoked (1)"
- [ ] **3.1.2** Implement tab switching to filter table data
- [ ] **3.1.3** Create responsive table header with proper column alignment

### 3.2 Table Columns & Data
- [ ] **3.2.1** Define table columns (from Figma design):
  - Resource/Role Name
  - Status (with colored badges: Active/Pending/Inactive/Revoked)
  - Requested Date
  - Valid From - Valid To
  - Actions (Edit, Request Extension, Revoke)
- [ ] **3.2.2** Populate mock data matching the Figma counts:
  - 4 Active records
  - 2 Pending records
  - 1 Inactive record
  - 1 Revoked record

### 3.3 Table Interactions
- [ ] **3.3.1** Add row hover states
- [ ] **3.3.2** Implement "Edit" action button → opens EditAccessRequest sidesheet
- [ ] **3.3.3** Implement "Request Extension" button → opens ExtendAccessRequest sidesheet
- [ ] **3.3.4** Implement "Revoke" button → opens RevokeAccess modal

---

## Phase 4: Sidesheets (Slide-out Panels)

### 4.1 Sidesheet Component Setup
- [ ] **4.1.1** Use Iris SideSheet component as container
- [ ] **4.1.2** Create sidesheet header with close button
- [ ] **4.1.3** Create sidesheet footer with action buttons (Cancel, Submit/Save)
- [ ] **4.1.4** Implement smooth animations and backdrop behavior

### 4.2 "Request Access" Sidesheet
- [ ] **4.2.1** Header: "Request New Access"
- [ ] **4.2.2** Form fields (from Figma):
  - Dropdown: Select Resource/Role (required)
  - Dropdown: Select Target (required)
  - Text Input: Justification (required)
  - Owner Section: Display resource owner with avatar, name, email
  - Dropdown: Duration/Expiry (required)
  - Text Area: Additional Notes (optional)
- [ ] **4.2.3** Add form validation
- [ ] **4.2.4** Submit button sends request and closes sidesheet

### 4.3 "Edit Access Request" Sidesheet
- [ ] **4.3.1** Similar form to "Request Access" but for editing existing request
- [ ] **4.3.2** Pre-populate fields with current values
- [ ] **4.3.3** Disable role/resource selection (read-only)
- [ ] **4.3.4** Update button saves changes

### 4.4 "Extend Access" Sidesheet
- [ ] **4.4.1** Header: "Extend Access"
- [ ] **4.4.2** Show current expiry date
- [ ] **4.4.3** Dropdown: Select new expiry duration
- [ ] **4.4.4** Text Area: Justification for extension
- [ ] **4.4.5** Confirm button extends access

### 4.5 "Revoke Access" Modal/Sidesheet
- [ ] **4.5.1** Header: "Revoke Access"
- [ ] **4.5.2** Display what will be revoked (resource name, current status)
- [ ] **4.5.3** Text Area: Reason for revocation (required)
- [ ] **4.5.4** Warning message about consequences
- [ ] **4.5.5** Confirm + Cancel buttons

---

## Phase 5: Form Components & Interactions

### 5.1 Iris Component Integration
- [ ] **5.1.1** Use Iris Dropdown component for all select fields
- [ ] **5.1.2** Use Iris TextInput component for text fields
- [ ] **5.1.3** Use Iris TextArea for multi-line inputs
- [ ] **5.1.4** Use Iris Button component for all buttons
- [ ] **5.1.5** Use Iris FormField component for form structure
- [ ] **5.1.6** Verify all form fields use correct Iris tokens for spacing, colors, fonts

### 5.2 Owner Card Component
- [ ] **5.2.1** Create reusable OwnerCard component displaying:
  - Avatar with initials
  - Owner name
  - Email address
  - "Owner" label
- [ ] **5.2.2** Use this in the "Request Access" sidesheet

### 5.3 Status Badge Component
- [ ] **5.3.1** Create reusable status badge for table cells
- [ ] **5.3.2** Colors/styles per status:
  - Active: Green
  - Pending: Yellow/Orange
  - Inactive: Gray
  - Revoked: Red
- [ ] **5.3.3** Include status icon if needed per Figma design

---

## Phase 6: Data Management & State

### 6.1 Mock Data Setup
- [ ] **6.1.1** Create mock access records (8 total):
  - 4 with status "Active"
  - 2 with status "Pending"
  - 1 with status "Inactive"
  - 1 with status "Revoked"
- [ ] **6.1.2** Create mock resources/roles list
- [ ] **6.1.3** Create mock users/owners list

### 6.2 Component State
- [ ] **6.2.1** Use React hooks for:
  - Current tab selection (status filter)
  - Filtered table data
  - Active sidesheet (which one is open)
  - Form data in sidesheets
- [ ] **6.2.2** Implement state updates on tab clicks
- [ ] **6.2.3** Implement state clearing when sidesheets close

### 6.3 Event Handlers
- [ ] **6.3.1** Tab click → filter table by status
- [ ] **6.3.2** Row action buttons → open appropriate sidesheet
- [ ] **6.3.3** Sidesheet submit → log/handle request (for now, close and show success message)
- [ ] **6.3.4** Sidesheet cancel → close without saving

---

## Phase 7: Styling & Tokens

### 7.1 Iris Design Tokens
- [ ] **7.1.1** Review [DesignTokens.md](../../src/iris-shell/src/tokens/DesignTokens.md) for available tokens
- [ ] **7.1.2** Apply spacing tokens to layout (margins, padding)
- [ ] **7.1.3** Apply color tokens to text, badges, backgrounds
- [ ] **7.1.4** Apply typography tokens to headings, body, labels
- [ ] **7.1.5** Apply motion tokens to transitions (hover, open/close)

### 7.2 Component Styling
- [ ] **7.2.1** Create CSS modules for ApprovalPage
- [ ] **7.2.2** Style each section (title, stats, table, etc.)
- [ ] **7.2.3** Implement responsive design for smaller screens
- [ ] **7.2.4** Verify dark mode compatibility

### 7.3 Figma Design Compliance
- [ ] **7.3.1** Compare built page to Figma at 1x scale
- [ ] **7.3.2** Verify spacing matches design (8px grid)
- [ ] **7.3.3** Verify typography (font families, sizes, weights)
- [ ] **7.3.4** Verify colors use design tokens (no hardcoded colors)

---

## Phase 8: Accessibility & Testing

### 8.1 Accessibility (A11y)
- [ ] **8.1.1** Run a11y audit: `pnpm run a11y-audit`
- [ ] **8.1.2** Verify WCAG compliance: `pnpm run a11y-verify`
- [ ] **8.1.3** Add ARIA labels to buttons and interactive elements
- [ ] **8.1.4** Verify tab order is logical
- [ ] **8.1.5** Verify forms are keyboard-navigable
- [ ] **8.1.6** Test with screen reader

### 8.2 Manual Testing
- [ ] **8.2.1** Test all tab switches work and filter correctly
- [ ] **8.2.2** Test opening/closing each sidesheet
- [ ] **8.2.3** Test form validation (required fields)
- [ ] **8.2.4** Test on desktop, tablet, mobile viewports
- [ ] **8.2.5** Test in light and dark themes

### 8.3 Build & Type Checking
- [ ] **8.3.1** Run `pnpm typecheck` - no errors
- [ ] **8.3.2** Run `pnpm lint` - no warnings (if applicable)
- [ ] **8.3.3** Run `pnpm build` - successful build

---

## Phase 9: Deep-Linking & Navigation

### 9.1 Route Configuration
- [ ] **9.1.1** Add approval page to router discriminated union
- [ ] **9.1.2** Enable "approval" route in verticals.ts
- [ ] **9.1.3** Verify hash-based navigation: `#/active-roles/approval`
- [ ] **9.1.4** Test direct URL access (bookmark, refresh)

### 9.2 Sidesheet URL Parameters (Optional)
- [ ] **9.2.1** If using URL params for sidesheet state, add to route
- [ ] **9.2.2** Example: `#/active-roles/approval?sidesheet=request-access`
- [ ] **9.2.3** Verify deep-links work for each sidesheet state

---

## Phase 10: Final Integration & Review

### 10.1 Local Build & Verification
- [ ] **10.1.1** Run full local build: `pnpm build`
- [ ] **10.1.2** Start dev server: `pnpm dev`
- [ ] **10.1.3** Navigate to approval page in browser
- [ ] **10.1.4** Screenshot approval page for comparison

### 10.2 Figma Design Audit
- [ ] **10.2.1** Create component/token review table:
  - Component name
  - Iris match (✅ or ❌)
  - Token usage (✅ or ❌)
- [ ] **10.2.2** Document any ❌ items (custom components, hardcoded values)
- [ ] **10.2.3** Present table to Designer for approval

### 10.3 Final Designer Review
- [ ] **10.3.1** Show Designer the localhost route
- [ ] **10.3.2** Compare built approval page to Figma design
- [ ] **10.3.3** Gather feedback on layout, interactions, spacing
- [ ] **10.3.4** Iterate on any discrepancies

### 10.4 Git & Deployment Readiness
- [ ] **10.4.1** Commit all work: `git add && git commit -m "Build approval page from Figma design"`
- [ ] **10.4.2** Push to origin: `git push origin master`
- [ ] **10.4.3** Verify Vercel deployment (once connected)

---

## Estimated Effort

- **Phase 1-2:** 2-3 hours (setup, routing, layout)
- **Phase 3-4:** 3-4 hours (table, sidesheets, form components)
- **Phase 5-6:** 2-3 hours (state management, data)
- **Phase 7:** 2 hours (styling, tokens)
- **Phase 8-9:** 1-2 hours (a11y, testing, deep-linking)
- **Phase 10:** 1-2 hours (review, refinement)

**Total:** 12-17 hours of implementation work

---

## Success Criteria

- ✅ Approval page loads at `#/active-roles/approval`
- ✅ Stats cards display correctly with mock data
- ✅ Table shows all 8 access records by default
- ✅ Tab filtering works (All/Active/Pending/Inactive/Revoked)
- ✅ Action buttons open correct sidesheets
- ✅ All sidesheets render forms with correct fields
- ✅ All Iris components used (no custom HTML for buttons, inputs, etc.)
- ✅ All design tokens applied (no hardcoded colors/spacing)
- ✅ A11y audit passes (WCAG 2.1 AA)
- ✅ Layout matches Figma design at 1x scale
- ✅ Dark mode works correctly
- ✅ Responsive on mobile/tablet/desktop
- ✅ No TypeScript or ESLint errors
- ✅ Component/token review table shows mostly ✅

---

## Next Steps

1. Review this task list with the Designer
2. Start Phase 1: Install dependencies and verify dev environment
3. Move to Phase 2: Create ApprovalPage component and route
4. Proceed systematically through each phase
5. Run local build after each major phase
6. Get Designer feedback at Phase 10

