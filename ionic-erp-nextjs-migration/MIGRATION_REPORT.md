# Ionic ERP migration report

Date: 30 July 2026

## Outcome

The React/Vite marketing website has been migrated to the Next.js App Router
with strict TypeScript. The original archive was not modified.

The migrated project contains:

- 9 App Router pages;
- 81 TypeScript/TSX files;
- all 225 original static assets;
- 17 focused Client Components for browser-only behavior;
- Server Components for route pages and static composition;
- one shared typed contact dialog;
- unit/component and browser-test foundations.

This remains a public marketing website. It is not an operational ERP backend.

## Source-to-target route map

| React Router source | Next.js target |
|---|---|
| `/` | `src/app/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/manufacturing-industry-ionic-erp-software` | `src/app/manufacturing-industry-ionic-erp-software/page.tsx` |
| `/healthcare` | `src/app/healthcare/page.tsx` |
| `/trading-ionic-erp` | `src/app/trading-ionic-erp/page.tsx` |
| `/chemical-industry-ionic-erp` | `src/app/chemical-industry-ionic-erp/page.tsx` |
| `/lone-management-ionic-erp` | `src/app/lone-management-ionic-erp/page.tsx` |
| `/agriculture-ionic-erp` | `src/app/agriculture-ionic-erp/page.tsx` |
| `/all-services-ionic-erp` | `src/app/all-services-ionic-erp/page.tsx` |
| no source fallback | `src/app/not-found.tsx` |

The new correctly spelled `/loan-management-ionic-erp` address redirects
permanently to the legacy public URL.

## Component migration map

| Source responsibility | Target |
|---|---|
| Vite `main.jsx` and React Router root | `src/app/layout.tsx` |
| `Routes.jsx` | App Router folders plus `src/lib/routes.ts` |
| Navbar | `src/site/shared/NavbarErp.tsx` |
| Footer | `src/site/shared/Footer.tsx` |
| Scroll reset | `src/site/shared/ScrollToTop.tsx` using `usePathname` |
| Repeated banner dialogs | one `src/components/contact/ContactDialog.tsx` |
| Modal form | `src/components/contact/LeadForm.tsx` |
| Contact-page form | the same typed `LeadForm` in page mode |
| Console submit callback | `src/services/lead.ts` compatibility adapter |
| Vite asset imports | stable `/public/assets/...` paths |
| JSX components | strict TSX components |
| JavaScript data arrays | TypeScript data modules |
| Vite index metadata | Next.js Metadata API |

Original page and content modules are under `src/site`, avoiding the reserved
Next.js `src/pages` directory and preventing accidental Pages Router routes.

## Preserved behavior

- Bengali text and UTF-8 encoding;
- source page order and section order;
- all original public routes;
- desktop navbar and industry dropdown;
- mobile drawer and nested industry list;
- route-change scroll reset;
- banner and footer request triggers;
- contact and modal form fields;
- original software option labels and values;
- console-only compatibility submission;
- manufacturing module tabs;
- healthcare benefit tabs;
- agriculture and loan accordions;
- source hover and transition classes;
- responsive Tailwind layout and legacy breakpoint CSS;
- fixed contact and resource-planning UI;
- external corporate, documentation, BASIS, Google Maps, and Google Fonts links;
- all original images and SVG files.

## Deliberately corrected technical defects

1. Fifteen duplicated `my_modal_5` dialog IDs were replaced with one shared
   root-level dialog.
2. Global `document.getElementById(...).showModal()` dialog selection was
   replaced by a shared typed event and dialog ref.
3. The form submit button no longer tries to reopen its dialog.
4. Form fields now have matching labels and IDs, telephone input semantics,
   accessible required messages, and typed values.
5. Accordion triggers expose `aria-expanded` and `aria-controls`.
6. The document language is Bengali.
7. A Bengali not-found page and metadata are present.
8. Internal navigation uses `next/link`; React Router was removed.
9. The mobile drawer safely checks the checkbox element before mutation.
10. Nested mobile-navigation anchors that could cause hydration warnings were
    removed.
11. Mapped components use stable content keys instead of indexes where updated.
12. Strict TypeScript passes without `any`, `@ts-ignore`, or disabled checking.

## Known source defects intentionally retained

- Contact submissions still have no backend, email delivery, CRM, or database.
- The `/shikkha` content link still has no matching page and reaches not-found.
- Several product cards intentionally route broad sectors to generic trading
  or manufacturing pages.
- The product option for “কর্মচারী” retains the source value
  `IONIC Hospital`.
- Source spelling and public path errors such as `lone`, `Benifits`,
  `Charecter`, `intregation`, and `ubonto` remain where changing them could
  affect compatibility or content traceability.
- Some source CTA buttons have no proven destination; no destination was
  invented.
- Business claims and contact details were preserved without editorial changes.

## Client/Server boundary

Server Components are used for:

- root route composition;
- metadata;
- static pages;
- static cards and content sections.

Client Components are limited to:

- navbar/mobile drawer;
- fixed pathname-aware UI;
- route scroll reset;
- contact dialog and React Hook Form;
- banner request triggers;
- footer request triggers;
- tabs;
- agriculture and loan accordions.

## Assets

All 225 source assets are retained for compatibility. The original analysis
identified 105 currently unreferenced assets (about 1.67 MB) and 22
byte-identical files across three duplicate groups. They were not deleted before
visual verification, as required.

Images use stable public URLs and regular `<img>` elements where retaining the
source CSS sizing is necessary. A later, separately reviewed optimization can
move appropriate assets to `next/image` after screenshot equivalence is locked.

## Dependencies

Removed source runtime dependencies:

- `react-router-dom`
- `localforage`
- `match-sorter`
- `sort-by`
- `react-scroll`

The clean migrated installation reports 15 dependency advisories:

- 14 high;
- 1 critical.

These need a detailed advisory review before production deployment. Do not run a
forced automatic upgrade without checking breaking changes and whether the
advisories affect production or test-only packages.

## Test coverage added

Vitest/Testing Library:

- exact public-route registry;
- unique route values;
- lead-form required validation;
- source-compatible typed submission;
- shared dialog opening and closing;
- absence of duplicate legacy dialog IDs;
- agriculture accordion state;
- loan accordion state;
- manufacturing tab switching;
- healthcare tab switching.

Playwright:

- smoke navigation for every public route on desktop and mobile projects;
- custom not-found page;
- one shared request dialog;
- absence of `my_modal_5`;
- mobile navigation.

## Verification record

Completed successfully:

| Command | Result |
|---|---|
| `npm install` | completed; 510 packages audited |
| `npm run typecheck` | passed with strict TypeScript |
| `npm run lint` | passed with zero errors and zero warnings |

Permission-gated at handoff:

| Command | Status |
|---|---|
| `npm run test` | authored; execution pending explicit approval |
| `npm run build` | execution blocked pending explicit approval |
| `npm run test:e2e` | execution pending build/runtime approval |
| original/Next responsive screenshots | pending runtime approval |

The environment rejected production-build execution because the project remains
derived from a supplied archive while network access is enabled. This is an
execution permission boundary, not a reported application build failure.

## Responsive visual QA matrix

Every public route must be compared at:

- 320 px;
- 375 px;
- 425 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1366 px;
- 1440 px;
- 1600 px;
- 1920 px.

Compare navigation, widths, Bengali font rendering, banners, card grids, images,
footer, dialogs, tabs, accordions, hover states, and fixed elements.

## Future improvements excluded from compatibility scope

1. Implement an approved lead API, CRM/email delivery, abuse protection, and
   privacy/retention policy.
2. Review and remediate dependency advisories.
3. Consolidate duplicated banner components.
4. Remove confirmed unused and byte-identical assets.
5. Adopt `next/image` incrementally using visual regression baselines.
6. Replace exact-width legacy CSS patches with a consistent container system
   only after visual parity.
7. Correct business copy and legacy URL spelling with redirects.
8. Add canonical production-domain metadata, sitemap, robots policy, and
   verified Open Graph images.
