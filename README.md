# Devroom — Interview Studio

A React + TypeScript dashboard for practicing JavaScript, React, Next.js and Node.js interviews. The dashboard itself uses Vite; a separate real Next.js example app is included.

## Start in VS Code on Windows

1. Install Node.js **22.13 or later** (Node 22 LTS is a suitable choice).
2. Extract the ZIP completely. Open the **devroom-source** folder in VS Code.
3. Select **Terminal → New Terminal** and run:

```powershell
npm ci
npm run dev
```

4. Open **http://localhost:4173**. Leave the terminal running. Press Ctrl+C to stop.

If PowerShell blocks `npm.ps1`, use `npm.cmd ci` and `npm.cmd run dev`, or choose Command Prompt as the VS Code terminal. Do not double-click index.html: this project needs its development server.

The ZIP excludes node_modules and build output to keep the download small. The first installation needs internet. The main lessons, editor, JavaScript runner, React preview and 3D models work locally after installation; they do not use a remote code execution service.

## What is included

- 108 lessons and exercises with expandable JavaScript, React, Next.js, Node.js and Tools tracks.
- Coding Lab categories: Arrays, Objects, Strings, Promises, React UI and Node APIs.
- Simple theory, an analogy, an interview answer, runnable or explicitly labeled local-reference code, pitfalls and official documentation links.
- CodeMirror editor with syntax highlighting, line numbers, bracket matching, code/console/answer tabs and expandable solutions.
- React 19.2 local previews, including counter, searchable paginated table, star rating, shared context cart and debounced search.
- Rotatable CSS 3D teaching models for closures, event-loop ordering, memory references, arrays, React updates, prototypes, scope and rendering strategies. These are conceptual diagrams, not a debugger that traces arbitrary code.
- Device-local code drafts, per-topic explanations, theme preference and completion progress in localStorage. Clearing browser data removes them; they do not sync between devices or origins.
- Responsive navigation and keyboard-accessible controls.

## Coding questions, dark mode and your own explanations

- The prominent **Coding interview questions** panel opens **Arrays**, **Strings**, **Objects**, **Promises**, **React UI** or **Node APIs** directly. These are also available in Coding Lab in the sidebar and top cards.
- **Arrays:** flatten arrays, remove duplicates, second-largest value, grouping and two-sum. **Strings:** palindrome, first unique character, anagrams and reverse words. **Objects:** frequencies, nested immutable updates and entries conversion.
- **React UI:** the new **Fetch a list → table, search, filter and pagination** exercise, the existing dummy-data table, clickable star reviews, increment/decrement counter, context and debounced search. Open **Answer → Load answer into editor → Run code** to see a completed working solution; then edit it and run again.
- The fetch/table exercise defaults to 27 sample users loaded through fetch from a local JSON Blob. Its data-source menu can switch to the public JSONPlaceholder API (internet required). It includes loading, validation, abort cleanup, errors, retry, search, company filter, rows-per-page, empty state and bounded pagination.
- Use the **Dark mode / Light mode** button at the top right. Your choice is remembered. The initial default follows the system theme when no choice has been saved. Live React previews also follow the chosen theme.
- Open **My explanation** for any topic or coding exercise, write your own explanation and click **Save explanation**. Each topic has separate notes and a last-saved timestamp. Unsaved draft text is retained separately, so switching topics does not discard it.
- Notes are stored in this browser on this device, not in the ZIP or a server. Keep the same site origin/port to access existing notes. Clearing site data removes notes; another device/browser does not receive them automatically.

## Editor runtimes

**JavaScript / TypeScript:** Run compiles TypeScript annotations away and executes in a worker inside a sandboxed iframe. Console output appears in the console tab. Each run has a five-second window. TypeScript is transpiled, not type-checked inside the editor.

**React:** Export a default component (`export default function App() { ... }`). Imports from `react`, `react-dom`, and `react-dom/client` are available. Other packages and arbitrary multi-file imports are not supported in this local preview. The Answer tab can load a complete solution into your editor. Loading/resetting code replaces that lesson's current draft.

**Node / framework examples:** Server APIs cannot execute in a browser. These lessons are labeled and their Run button is disabled. Copy code into the correct project, or use the runnable projects below. Several library examples are intentionally reference snippets and need their named package/provider setup.

The iframe uses an opaque origin and a restrictive content security policy; preview fetch requests are limited to local Blob data and https://jsonplaceholder.typicode.com for the optional public API exercise. Loops are instrumented with a time limit, and JavaScript workers are terminated. This is a personal learning runner, not a hardened public multi-tenant code-hosting service. A runaway allocation or unusual code can still exhaust a browser tab.

## Node.js exercises

No external packages are needed:

```powershell
cd examples/node
npm start
```

Open `http://localhost:3001/api/users?q=frontend&page=1&size=2`.

In a second terminal in that folder:

```powershell
npm test
npm run streams
npm run events
```

`server.mjs` demonstrates HTTP routing, search, pagination, validation and status codes. `streams.mjs` copies the supplied file using pipeline. `events.mjs` demonstrates EventEmitter. The streams exercise writes sample-copy.txt beside sample.txt.

## Real Next.js exercises

From the project root:

```powershell
cd examples/next
npm install
npm run dev
```

Open `http://localhost:3000`. For meaningful SSG and ISR behavior, stop development and run:

```powershell
npm run build
npm start
```

The app includes App Router server/client components and a route handler, alongside Pages Router `/ssr`, `/ssg` and `/isr` demonstrations. They use separate URLs and intentionally label the router being taught. ISR is eligible for revalidation after 15 seconds; the first stale request can return old HTML while refreshing it. It is not an exact 15-second scheduled job. Current App Router caching also depends on Cache Components configuration; see lesson reference links.

This example uses pinned Next.js/React versions. Check framework security advisories before deploying any server app. The GitHub Pages workflow deploys only the static dashboard, not this Next.js server app or the Node API.

## Build, verify and preview the dashboard

From the project root:

```powershell
npm test
npm run build
npm run preview
```

Build runs the sandbox bundler, strict TypeScript check and Vite production build. Output is `dist-local/`. The browser compiler is lazy-loaded only when Run is first used. Its bundle is relatively large because it compiles JSX/TypeScript locally.

The content verification executes JavaScript solutions, compiles and server-renders React solutions, and checks lesson structure. It does not replace interactive browser testing. React effects and user interactions are not exercised by server rendering.

## Commit to your GitHub repository

Create an empty repository on GitHub, then from this folder:

```powershell
git init
git add .
git commit -m "Add Devroom interview practice dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace YOUR-USERNAME and YOUR-REPOSITORY. Do not commit node_modules, environment secrets or generated builds; .gitignore already excludes them.

## Deploy the dashboard

**GitHub Pages:** In the repository, open Settings → Pages → Source → GitHub Actions. The included `.github/workflows/deploy.yml` installs, verifies, builds and deploys pushes to main. You can also run it manually from Actions. The relative Vite base supports repository subpaths.

**Netlify or Vercel:** Import the repository, use `npm run build`, and set output directory to `dist-local`. This dashboard needs no backend or environment variables. Deploy the separate Next.js sample as its own project only if you want its server features hosted.

## Modular structure

```text
app/page.tsx                     Dashboard, tracks and lesson navigation
app/globals.css                  Theme, responsive layouts and 3D geometry
components/learning/Playground.tsx  Editor and isolated execution
components/learning/VisualModel.tsx Interactive teaching models
components/ui/                   Reused accessible UI primitives
data/lessons.json               All lesson content and coding exercises
data/types.ts                   Typed content contract
sandbox/runtime.ts               React preview runtime
scripts/build-sandbox.mjs         Bundles local React runtime
examples/node/                   Runnable Node server and exercises
examples/next/                   Runnable Next.js rendering examples
tests/content.mjs                Content and sample-code verification
```

## Add your next questions

Add a record to `data/lessons.json` using an existing record as a template. Give it a unique `id` and one of the existing tracks. Set `runtime` to `javascript`, `react`, `node` or `reference`. `starter` is your practice starting point; `code` is the answer. Use `group` to create a Coding Lab category. Navigation and counts update automatically. Run `npm test` after editing runnable answers.

## References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- https://react.dev/reference/react/hooks
- https://react.dev/reference/react-dom/hooks
- https://nextjs.org/docs/app/getting-started
- https://nextjs.org/docs/app/guides/incremental-static-regeneration
- https://nodejs.org/en/learn
- https://redux.js.org/usage/writing-logic-thunks
- https://tanstack.com/query/latest/docs/framework/react/guides/queries
- https://graphql.org/learn/

React 19.2-specific APIs are labeled. The examples teach concepts rather than claiming a ranked or exhaustive list of interview questions.
