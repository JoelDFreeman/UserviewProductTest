# Active Roles UserView Build Plan

## Scope

Build the UserView experience represented by the Figma file `ARS_WebUI2_User-View-Approvals` in the isolated project:

`C:/Users/JFreeman/OneDrive - Quest/Documents/Code/ARS-UserView-Approvals`

The experience has four fixed side-navigation destinations:

1. Homepage
2. User Profile
3. Approvals
4. My Access

There is no Directory management navigation, Insights navigation, tree/flat view switch, or secondary directory-management rail in this UserView experience.

## Non-negotiable implementation rules

- Figma is the source of truth for each page, side sheet, dialog, interaction, label, state, spacing, and visual treatment.
- Use only components and icons from the subscribed Iris and ARS libraries:
  - Iris UI, UI Kit
  - Iris UI, Icons
  - Iris UI, Variables
  - ARS - Primary
- Reuse matching components already present in `src/iris-shell/src/components/` where they correspond to the Figma library component.
- Do not invent components, icons, statuses, fields, actions, labels, data, or interactions.
- Do not substitute text characters, hand-drawn SVGs, generic icon libraries, or custom controls for Figma library assets.
- Do not implement a page until its Figma frame and all directly associated side sheets/dialogs have been inspected and mapped.
- Keep page state in the page/view layer. Keep shared shell state in the existing shell context only when the interaction is genuinely shell-wide.
- Use existing Iris tokens and CSS-module conventions. Do not add hard-coded colors or speculative design values.
- Work in a maximum of three implementation steps at a time, then pause for evaluation and confirmation.

## Shared foundation: one gated sequence

### Foundation Step 1: Confirm the UserView frame inventory

Inspect the Figma file and record the exact node IDs and names for:

- Homepage frame and its associated side sheets/dialogs
- User Profile frame and its associated side sheets/dialogs
- Approvals frame and its associated side sheets/dialogs
- My Access frame and its associated side sheets/dialogs
- The fixed UserView side navigation
- Any shared header, breadcrumb, overlay, table, form, or feedback components

**Output:** A frame inventory with exact Figma node IDs. No implementation yet.

### Verified inventory from the Figma `Iris` page

| UserView destination | Page frame | Associated overlays or states identified |
|---|---|---|
| Homepage | `10199:6772` `home-dashboard` | No additional Homepage overlay identified in the inspected top-level inventory |
| User Profile | `10199:7207` `user-profile-settings` | `10199:7273` `User Profile Content` instance; profile edit affordance is present and requires interaction verification |
| Approvals | `10199:7351` `Design-1-Approvals-Dashboard` | `10199:7454` `Approve`, `10199:7498` `Approved`, `10199:7556` `Denied`; `10199:7617` `Modal 1: Approve`, `10199:7638` `Modal 2: Deny`, `10199:7659` `Modal 3: Escalate` |
| My Access | `10199:6654` `my-access-screen-full` | Request Access composition `10199:7056` `my-access-request-sidesheet`; open sidesheet `10199:7205` `Sidesheet`; form instance `10199:7206` `Form Content` |

Shared fixed navigation is represented by the `Sidebar` instance inside each page frame, including `10199:6773`, `10199:7208`, `10199:6655`, and `10199:7057`. The exact four navigation labels and icon mappings remain subject to the component-map step; no replacement icons will be inferred from the current shell.

The inventory above is an initial verified top-level inventory. Before implementation, the next foundation step must inspect the nested page and overlay contexts to confirm whether any additional side sheets, dialogs, or interaction states are present.

**Pause for confirmation:** Review the inventory and confirm that the four page names and associated overlays are complete.

### Foundation Step 2: Map every visible element to a library component

For the approved frame inventory:

- Inspect each frame with Figma design context.
- Identify the matching Iris UI or ARS library component for every visible control and icon.
- Check the local React component directory for an existing implementation of each mapped component.
- Record gaps as blockers requiring the exact library component reference; do not fill gaps with invented UI.

**Output:** A component map containing Figma node, library component, local implementation path, and required variant/state.

### Provisional component map from approved Figma contexts

These are mappings from Figma evidence to existing local Iris implementations. The exact component variants remain to be confirmed from each component instance before implementation.

| Figma use | Figma evidence | Library component to use | Existing local implementation |
|---|---|---|---|
| Fixed UserView navigation | `Sidebar` instances inside all four page frames; labels Home, User Profile, Approvals, My Access, Settings, Help with | Iris `Sidebar` plus Iris Icons used by the frame | `src/iris-shell/src/components/Sidebar/Sidebar.tsx`, `src/iris-shell/src/components/Icon/Icon.tsx` |
| Shared top header | `Header` instances; Figma context provides `AppHeader` and Iris `Button` Code Connect references | Iris `AppHeader`, Iris `Button` | `src/iris-shell/src/components/AppHeader/AppHeader.tsx`, `src/iris-shell/src/components/Button/Button.tsx` |
| Homepage quick-navigation cards | `UserProfileCard`, `ApprovalsCard`, `ManagedResourcesCard`, `MyAccessCard` in `10199:6772` | Iris `Card`, Iris `Badge`, mapped Iris icons | `src/iris-shell/src/components/Card/Card.tsx`, `src/iris-shell/src/components/Badge/Badge.tsx`, `src/iris-shell/src/components/Icon/Icon.tsx` |
| Homepage charts | `BarChartCard`, `DonutChartCard`, and chart icon instances in `10199:6772` | Iris `BarChart`, Iris `DonutChart`, mapped Iris chart icons | `src/iris-shell/src/components/BarChart/BarChart.tsx`, `src/iris-shell/src/components/DonutChart/DonutChart.tsx` |
| User Profile identity header | `AvatarWrapper`, `JD_Avatar`, edit icon overlay in `10199:7207` | Iris `Avatar`, Iris `Icon`, mapped Iris edit icon | `src/iris-shell/src/components/Avatar/Avatar.tsx`, `src/iris-shell/src/components/Icon/Icon.tsx` |
| User Profile editable fields | `Text input`, `Dropdown`, `Text area` instances in `10199:7207` | Iris `TextInput`, `Select`/mapped Iris dropdown, `Textarea`, with `FormField` where the instance requires it | `src/iris-shell/src/components/TextInput/TextInput.tsx`, `src/iris-shell/src/components/Select/Select.tsx`, `src/iris-shell/src/components/Textarea/Textarea.tsx`, `src/iris-shell/src/components/FormField/FormField.tsx` |
| User Profile read-only account values | `ReadOnlyValue` regions and `Badge` instance in `10199:7207` | Iris `DescriptionList` or existing Iris read-only pattern only if confirmed by the component map; Iris `Badge` | `src/iris-shell/src/components/DescriptionList/DescriptionList.tsx`, `src/iris-shell/src/components/Badge/Badge.tsx` |
| Approvals search and metrics | `Search-Icon`, `KPI-Metric-Row`, `Badge` instances in `10199:7351` | Mapped Iris search icon, Iris `StatCard` or the exact ARS metric component if present, Iris `Badge` | `src/iris-shell/src/components/Icon/Icon.tsx`, `src/iris-shell/src/components/StatCard/StatCard.tsx`, `src/iris-shell/src/components/Badge/Badge.tsx` |
| Approvals table and filters | `Tabs`, `Iris Table`, table head/cell instances, `Toggle`, `Pagination` in `10199:7351` | Iris `Tabs`, Iris `DataTable`, Iris `Checkbox`/`Toggle` only when the exact local/library mapping is confirmed, Iris `Pagination` | `src/iris-shell/src/components/Tabs/Tabs.tsx`, `src/iris-shell/src/components/DataTable/DataTable.tsx`, `src/iris-shell/src/components/Checkbox/Checkbox.tsx`, `src/iris-shell/src/components/Pagination/Pagination.tsx` |
| Approval decision overlays | `Approve`, `Approved`, `Denied`, and `Modal 1: Approve`, `Modal 2: Deny`, `Modal 3: Escalate` | Iris `Modal`, Iris `Button`, mapped ARS/Iris form and status components | `src/iris-shell/src/components/Modal/Modal.tsx`, `src/iris-shell/src/components/Button/Button.tsx` |
| My Access statistics and records | `StatsRow`, `RecordsTableCard`, `Tabs`, `Iris Table`, `Toggle`, `Pagination` in `10199:6654` | Iris `StatCard`, `Tabs`, `DataTable`, mapped Iris toggle, `Pagination` | `src/iris-shell/src/components/StatCard/StatCard.tsx`, `src/iris-shell/src/components/Tabs/Tabs.tsx`, `src/iris-shell/src/components/DataTable/DataTable.tsx`, `src/iris-shell/src/components/Pagination/Pagination.tsx` |
| My Access request form | `Sidesheet` `10199:7205` with `Dropdown`, `Text input`, `Text area`, owner region, header, footer | Iris `SideSheet`, `Select`/mapped dropdown, `TextInput`, `Textarea`, `Avatar`, `Button`; use an ARS owner component only if the library map identifies one | `src/iris-shell/src/components/SideSheet/SideSheet.tsx`, `src/iris-shell/src/components/Select/Select.tsx`, `src/iris-shell/src/components/TextInput/TextInput.tsx`, `src/iris-shell/src/components/Textarea/Textarea.tsx`, `src/iris-shell/src/components/Avatar/Avatar.tsx`, `src/iris-shell/src/components/Button/Button.tsx` |

The map deliberately does not create `StatsCard`, `StatusBadge`, `OwnerCard`, or a custom table. The existing Iris `StatCard`, `Badge`, `DataTable`, and `SideSheet` must be used when their Figma variants match. Any mismatch is a mapping blocker, not an invitation to invent a replacement.

**Pause for confirmation:** Review and approve the component map before any page code is written.

### Foundation Step 3: Replace the existing Active Roles navigation model

Update the shell configuration only after the frame inventory and component map are approved:

- Replace the current Active Roles Directory management/Insights/Approval/Customization navigation with the fixed UserView navigation.
- Add routes for Homepage, User Profile, Approvals, and My Access using the existing discriminated-union hash router.
- Remove or hide the directory-management secondary sidebar for UserView routes.
- Set the correct default UserView route from the approved Figma/product requirement.
- Use only the icon names mapped from the Iris or ARS library.

**Validation:** Typecheck and open each route in the browser.

**Pause for confirmation:** Confirm the fixed navigation and route destinations before building page content.

---

# Page 1: Homepage

**Goal:** Reproduce the Homepage Figma frame and its exact interactions.

### Verified Homepage frame map

**Figma frame:** `10199:6772` `home-dashboard` (1440 x 1024)

| Region | Figma evidence | Approved implementation boundary |
|---|---|---|
| Fixed navigation | `10199:6773` `Sidebar` | Existing Iris `Sidebar` composition, with exact UserView labels/icons from the approved navigation map |
| Shared header | `10199:6776` `Header` | Existing Iris `AppHeader` and its mapped Iris `Button` instances |
| Page surface | `10199:6777` `PageWrapper`, `10199:6778` `ContentPanel` | Existing shell layout and existing token/CSS-module conventions |
| Welcome content | `10199:6779` `WelcomeRow`, `10199:6780` `WelcomeHeading`, `10199:6781` `WelcomeSubtitle` | Figma-confirmed text hierarchy and token styles |
| Quick navigation cards | `10199:6782` `QuickNavRow` containing `UserProfileCard`, `ApprovalsCard`, `ManagedResourcesCard`, `MyAccessCard` | Existing Iris `Card` and `Badge`, plus the exact mapped Iris Icons: `People/User`, `System/CheckCircle`, `Editing/FolderUser`, `Security/Key` |
| Approvals chart | `10199:6819` `ChartsRow`, `10199:6820` `BarChartCard` | Existing Iris `BarChart` plus exact mapped Iris `Finance/ChartBar` icon and Figma-confirmed chart values/labels |
| Approval distribution chart | `10199:6860` `DonutChartCard` | Existing Iris `DonutChart` plus exact mapped Iris `System/CheckCircle` icon and Figma-confirmed segments/legend |

### Homepage interaction boundary

The retrieved Homepage design context contains the four quick-navigation cards and their destination concepts, but does not provide an explicit implementation handler or a separate Homepage side sheet/dialog frame. Therefore:

- Card click destinations must be confirmed from the Figma prototype interaction flow before wiring navigation.
- No card click, chart interaction, modal, side sheet, menu, or custom control will be invented from the visual layout alone.
- The Homepage implementation step may build the visible card/chart composition only after the component variants are confirmed.

### Homepage Step 3 verification result

Figma prototype inspection checked `UserProfileCard` (`10199:6783`), `ApprovalsCard` (`10199:6792`), `ManagedResourcesCard` (`10199:6801`), `MyAccessCard` (`10199:6810`), `BarChartCard` (`10199:6820`), and `DonutChartCard` (`10199:6860`). Each returned an empty `reactions` array. Homepage Step 3 therefore requires no code change: the cards and charts remain static until an explicit interaction flow is added to Figma.

### Homepage Step 1: Inspect and map the frame

- Retrieve design context for the approved Homepage frame.
- Inspect all nested regions, component instances, icons, text, states, and overlays.
- Identify every associated Homepage side sheet/dialog and the interaction that opens it.
- Add the findings to the component map.

**Validation:** Compare the node hierarchy and screenshot against the Figma frame.

**Pause for confirmation:** Approve the Homepage frame breakdown and interaction list.

### Homepage Step 2: Implement the static page composition

- Create the Homepage view in the existing `src/iris-shell/src/views/` structure.
- Compose it only from approved Iris/ARS components and existing tokens.
- Match the Figma layout, typography, spacing, states, and responsive behavior.
- Do not implement unverified actions or placeholder controls.

**Validation:** Typecheck and compare the page at the Figma viewport size.

**Pause for confirmation:** Evaluate the rendered Homepage before interactions are added.

### Homepage Step 3: Implement verified Homepage interactions

- Add only the interactions documented in the approved Figma frame flow.
- Implement each associated side sheet/dialog with its approved Iris/ARS components.
- Verify open, close, cancel, submit, validation, focus, and overlay behavior only where shown in Figma.

**Validation:** Test each documented interaction and run the relevant accessibility checks.

**Pause for confirmation:** Approve Homepage behavior before moving to User Profile.

---

# Page 2: User Profile

**Goal:** Reproduce the User Profile Figma frame and its exact interactions.

### Verified User Profile frame map

**Figma frame:** `10199:7207` `user-profile-settings` (1440 x 1024)

| Region | Figma evidence | Approved implementation boundary |
|---|---|---|
| Fixed navigation and header | `10199:7208` `Sidebar`, `10199:7211` `Header` | Existing Iris shell components with the exact UserView icon instances from Figma |
| Profile identity header | `10199:7215` `ProfileHeaderSection`, `10199:7216` `AvatarWrapper`, `10199:7217` `JD_Avatar`, `10199:7223` `UserMeta` | Existing Iris `Avatar` and mapped Iris edit icon; exact profile text from the approved design data |
| Personal information | `10199:7228` `PersonalInformationSection` with field instances `10199:7231`, `10199:7232`, `10199:7234`, `10199:7235`, `10199:7237`, and `10199:7239` | Existing Iris `TextInput` and `Textarea` instances, with exact Figma labels, values, helper text, and layout |
| Work information | `10199:7241` `WorkInformationSection` with `Text input` instances `10199:7244`, `10199:7247`, `10199:7248` and `Dropdown` instance `10199:7245` | Existing Iris `TextInput`, mapped Iris dropdown/`Select`, and exact Figma field content |
| Account information | `10199:7250` `AccountInformationSection` with read-only values `10199:7253`, `10199:7257`, `10199:7261`, `10199:7265` and status `Badge` `10199:7264` | Existing Iris read-only presentation only after confirming the mapped Figma component; existing Iris `Badge` for the status variant |
| Form actions | `10199:7270` `FormActions` with Iris `Button` instances `10199:7271` and `10199:7272` | Existing Iris `Button`, exact Ghost and Primary text-only variants from Figma |

### User Profile interaction boundary

Prototype inspection returned no reactions for the page frame (`10199:7207`), profile content instance (`10199:7273`), edit-avatar affordance (`10199:7219`), or any field instance. The two form buttons contain only `ON_HOVER` component-variant reactions with no destination. Therefore:

- No avatar editor, profile save flow, cancel flow, dropdown behavior, or side sheet/dialog is to be invented from this frame.
- The page implementation must reproduce the visible form and button states only.
- Any functional edit/save behavior requires an explicit Figma prototype flow or separate product requirement before implementation.

### User Profile Step 3 verification result

User Profile Step 3 requires no additional implementation. The Figma prototype contains no destination or state-change reactions for the page, avatar affordance, or fields. The Cancel and Save Changes instances contain only `ON_HOVER` component-variant reactions, which are already represented by the Iris button states. No save, cancel, avatar edit, dropdown, side sheet, or dialog behavior has been added.

### User Profile Step 1: Inspect and map the frame

- Retrieve design context for the approved User Profile frame.
- Identify all profile sections, controls, icons, states, and associated side sheets/dialogs.
- Map each visible element to Iris UI or ARS library components.

**Pause for confirmation:** Approve the User Profile frame breakdown and interaction list.

### User Profile Step 2: Implement the static page composition

- Create the User Profile view using only the approved component map.
- Match the Figma layout, content hierarchy, tokens, typography, spacing, and states.
- Reuse shared components only when the Figma component and variant match.

**Validation:** Typecheck and compare the rendered page with Figma.

**Pause for confirmation:** Evaluate the rendered User Profile before interactions are added.

### User Profile Step 3: Implement verified profile interactions and side sheets

- Implement only the Figma-documented profile actions.
- Build the corresponding side sheets/dialogs from mapped Iris/ARS components.
- Verify keyboard, focus, close, cancel, validation, and completion behavior shown in Figma.

**Validation:** Run interaction checks and accessibility checks.

**Pause for confirmation:** Approve User Profile behavior before moving to Approvals.

---

# Page 3: Approvals

**Goal:** Reproduce the Approvals Figma frame and its exact approval-management interactions.

### Verified Approvals frame map

**Dashboard frame:** `10199:7351` `Design-1-Approvals-Dashboard` (1440 x 1024)

| Region | Figma evidence | Approved implementation boundary |
|---|---|---|
| Fixed navigation and header | `10199:7352` `Sidebar`, `10199:7355` `Header` | Existing Iris shell with the exact fixed UserView navigation and mapped Iris/ARS icons |
| Heading and search | `10199:7358` `Header-Title-Bar`, `10199:7360` `Approvals`, `10199:7361` supporting text, `10199:7362` search control | Existing Iris heading/header patterns and mapped Iris search icon |
| KPI metrics | `10199:7365` `KPI-Metric-Row` | Existing Iris metric/card component only if its variant matches; values are Pending Approvals 3, Approved Today 12, Rejected Today 1 |
| Filters | `10199:7384` `Filter-Buttons` | Existing Iris `Button` variants; labels are `All (16)`, `Pending (3)`, and `Previous (13)` |
| Requests table | `10199:7388` `Table-Section`, `10199:7389` `Table-Header`, `10199:7411` `Table Body` | Existing Iris table/data-table component only if its mapped variant matches; columns are Request ID, Requester, Requested Object, Object Type, Owner, Access Duration, Status |
| Pagination | `10199:7452` `Footer-Pagination-Row`, `10199:7453` `Pagination` | Existing Iris `Pagination`; Figma shows page 1, ellipsis, page 154, and previous/next controls |

### Verified request detail and decision frames

| State or overlay | Figma node | Verified content |
|---|---|---|
| Review pending request | `10199:7454` `Approve` | Header `Review Request`; request REQ-001; John Smith; Finance-Admin Group; Directory; Sarah Mitchell owner; 24 Hours; reason text; footer actions Deny, Escalate, Approve |
| Approved request details | `10199:7498` `Approved` | Header `Request Details`; approved banner; decision details; approved date; REQ-003 details; Close action |
| Denied request details | `10199:7556` `Denied` | Header `Request Details`; denied banner; decision details; denial date/reason; REQ-004 details; Close action |
| Approve confirmation | `10199:7617` `Modal 1: Approve` | Header `Approve Request`; request summary; optional Comments textarea; Cancel and Approve actions |
| Deny confirmation | `10199:7638` `Modal 2: Deny` | Header `Deny Request`; request summary; required Reason for Denial textarea; Cancel and Deny actions |
| Escalate confirmation | `10199:7659` `Modal 3: Escalate` | Header `Escalate Request`; required To and Subject text inputs; required Message textarea; Cancel and Send Escalation actions |

### Approvals interaction boundary

The inspected Figma metadata/design contexts provide the complete visual states and controls but no explicit prototype destination reactions. The following behaviors therefore remain pending explicit Figma prototype confirmation: selecting a dashboard row, opening Review Request, opening Approve/Deny/Escalate modals, confirming a decision, showing Approved/Denied states, closing overlays, filtering, searching, and pagination. No inferred behavior will be implemented.

### Approvals Step 3 verification result

Interaction inspection of `10199:7351`, `10199:7454`, `10199:7498`, `10199:7556`, `10199:7617`, `10199:7638`, and `10199:7659` exposed no prototype reactions, triggers, destinations, navigation targets, overlays, or interaction definitions for the dashboard controls, request rows, decision actions, modals, or state frames. Approvals Step 3 therefore requires no code change. The implemented dashboard remains a faithful static representation until explicit prototype flows are added to Figma or separately specified.

### Approvals Step 1: Inspect and map the frame

- Retrieve design context for the approved Approvals frame.
- Identify the approval list/table structure, filters, statuses, actions, icons, empty/loading/error states, and associated side sheets/dialogs.
- Map every visible control to an Iris UI or ARS library component and variant.

**Pause for confirmation:** Approve the Approvals frame breakdown, data states, and interaction list.

### Approvals Step 2: Implement the static page composition

- Create the Approvals view using the approved components and existing token system.
- Match the exact Figma layout and responsive behavior.
- Use only data and labels confirmed by the Figma frame or explicitly provided product requirements.

**Validation:** Typecheck and compare the rendered page with Figma.

**Pause for confirmation:** Evaluate the rendered Approvals page before interactions are added.

### Approvals Step 3: Implement verified approval actions and side sheets

- Implement only the documented approval actions, including any request review or decision side sheets/dialogs shown in Figma.
- Use the exact mapped buttons, menus, inputs, badges, and icons.
- Verify confirmation, cancellation, validation, feedback, focus, and close behavior shown in the design.

**Validation:** Test every documented approval flow and run accessibility checks.

**Pause for confirmation:** Approve Approvals behavior before moving to My Access.

---

# Page 4: My Access

**Goal:** Reproduce the My Access Figma frame and its exact request/access-management interactions.

**Known frame currently inspected:** `10199:7056`, named `my-access-request-sidesheet`.

**Known associated frame currently inspected:** `10199:7205`, named `Sidesheet`, containing the `Form Content` instance.

The inspected design shows a My Access page with a fixed UserView side navigation and a Request Access side sheet. The exact visible controls, labels, states, and dimensions must be taken from Figma design context and the approved component map.

### Verified My Access frame map

**Full page frame:** `10199:6654` `my-access-screen-full` (1440 x 1024)

| Region | Figma evidence | Approved implementation boundary |
|---|---|---|
| Fixed navigation and header | `10199:6655` `Sidebar`, `10199:6658` `Header` | Existing Iris shell with the exact fixed UserView navigation and mapped Iris/ARS icons |
| Heading and actions | `10199:6661` `TitleRow`, `10199:6663` `My Access`, `10199:6664` supporting text, `10199:6666` and `10199:6667` Button instances | Existing Iris `Button` variants with exact labels `Export` and `Request Access` |
| Summary cards | `10199:6668` `StatsRow` | Existing Iris metric/card component only if the Figma variant matches; values are Active Access 4, Pending Approval 2, Inactive 1, Revoked 1 |
| Records table | `10199:6693` `RecordsTableCard`, `10199:6694` `Iris Table`, `10199:6698` `Tabs`, table head/cell instances | Existing Iris `Tabs` and `DataTable`/mapped Iris table variant; columns are Object Name, Object Type, Status, About, Time Remaining, Auto Extend |
| Row states | Rows `10199:6707`, `10199:6715`, `10199:6723`, `10199:6731`, `10199:6739`, `10199:6747`, `10199:6755`, `10199:6763` | Use exact Figma object/type/status/about/time values and mapped Iris `Badge` and toggle variants |
| Pagination | `10199:6771` `Pagination` | Existing Iris `Pagination`; Figma shows pages 1, 2, 3, 4, ellipsis, and 154 |

**Open request composition:** `10199:7056` `my-access-request-sidesheet`, showing the same fixed navigation and page with scrim plus a right-side 512px sidesheet. The embedded table variant shows four rows and uses `Permanent` for the IT-Ops-Directory duration in that state.

**Request sidesheet:** `10199:7205` `Sidesheet` (512 x 1024), with header `Request Access`, supporting text `Browse resources and enter details below to request temporary or permanent access permissions.`, close control `X`, and footer actions `Cancel` and `Submit Request`.

**Request form:** `10199:7206` `Form Content`, in this order:

1. `Requested Object` (Required), selected value `100 Available objects`
2. `Object Type` (Required), selected value `Directory`
3. `Description`, value `Campaign assets and public relations directories`
4. `Owner`, showing SM, Sarah Mitchell, `sarah.mitchell@company.com`, and `Owner`
5. `Access Duration` (Required), selected value `Permanent`
6. `Reason for Request` (Required), counter `0/100`, placeholder `Please describe why you need access to this resource...`

### My Access interaction boundary

Figma confirms the open-sidesheet visual state but does not expose destination reactions for Request Access, X, Cancel, Submit Request, table tabs, row toggles, or pagination. These behaviors remain pending explicit prototype confirmation. No inferred open, close, submit, filter, toggle, or pagination behavior will be implemented.

### My Access Step 3 verification result

Interaction inspection of `10199:6654`, `10199:7056`, `10199:7205`, and `10199:7206` exposed no prototype reactions or destinations for Export, Request Access, the sidesheet close/cancel/submit controls, tabs, Auto Extend states, pagination, table rows, or form fields. My Access Step 3 therefore requires no additional code change. The implemented page remains a faithful static representation until explicit prototype flows are added to Figma or separately specified.

### My Access Step 1: Inspect and map the complete page flow

- Retrieve design context for the My Access page frame.
- Retrieve design context for the Request Access side sheet and every other My Access overlay/frame present in Figma.
- Record exact page sections, table columns, tabs, statuses, actions, form fields, validation, owner/resource presentation, and submit/cancel behavior.
- Map every control and icon to Iris UI or ARS library components.

**Pause for confirmation:** Approve the complete My Access page and side-sheet interaction map.

### My Access Step 2: Implement the static page composition

- Create the My Access view using only approved Iris/ARS components.
- Implement the fixed navigation selection state for My Access.
- Match the Figma layout, tokens, typography, spacing, table structure, and visible states.
- Do not create new StatsCard, StatusBadge, table, owner card, or form components unless the Figma library map and local code review explicitly establish that an existing library component should be composed that way.

**Validation:** Typecheck and compare the rendered page at the Figma viewport size.

**Pause for confirmation:** Evaluate the rendered My Access page before adding side-sheet behavior.

### My Access Step 3: Implement the verified side-sheet and access interactions

- Implement Request Access and any other My Access side sheets/dialogs confirmed in Figma.
- Use the exact Iris/ARS form controls, buttons, icons, and variants from the component map.
- Implement only Figma-confirmed filtering, tab changes, row actions, validation, submission, cancellation, and feedback states.

**Validation:** Test all approved My Access flows, keyboard behavior, focus management, overlay dismissal, and accessibility.

**Pause for confirmation:** Approve My Access behavior before final integration.

---

# Final Integration

### Final Step 1: Cross-page navigation and state review

- Verify the fixed side navigation routes to exactly Homepage, User Profile, Approvals, and My Access.
- Verify active navigation state and direct URL loading for every page.
- Verify no Directory management, Insights, tree/flat view, or secondary directory rail appears in UserView.

**Pause for confirmation:** Approve cross-page navigation.

### Final Step 2: Design-system and visual audit

- Verify every visible component and icon against the approved Figma-to-library map.
- Verify no invented component, icon, hard-coded color, speculative field, or unapproved interaction was introduced.
- Run typecheck, build, and required accessibility checks.
- Compare representative desktop and mobile views with Figma.

**Pause for confirmation:** Review the audit results and identify any final corrections.

### Final Step 3: Final correction and handoff

- Apply only confirmed corrections.
- Re-run focused validation, full build, and accessibility checks.
- Summarize completed pages, verified interactions, remaining design questions, and test results.

## Working protocol

After each step, stop and wait for evaluation and confirmation. The next action is taken only after confirmation or a requested correction.
