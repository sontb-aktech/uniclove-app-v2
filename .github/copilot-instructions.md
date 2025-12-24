# Copilot / AI Agent Instructions — Uniclove App

Purpose: quickly onboard an AI coding agent to be productive in this React Native + TypeScript app.

1) Big picture
- App entry: [src/App.tsx](src/App.tsx#L1) composes global providers: `ThemeProvider`, `LocalizationProvider`, Redux store (`stores`), `PersistGate`, and `NavigationContainer` which mounts `Nav` ([src/Nav.tsx](src/Nav.tsx#L1)).
- Navigation routing lives in `src/Nav.tsx`; use `src/NavigationService.ts` for programmatic navigation.
- Chat/AI surface: streaming chat logic and helpers live in [src/ChatGPTProvider.tsx](src/ChatGPTProvider.tsx#L1) and `components/ChatGPTRoot`. The provider exposes `ChatGPTPContext` with `postStreamedMessage` and `onChatGPTStop`.

2) Where to look first (quick map)
- App bootstrap: [src/App.tsx](src/App.tsx#L1)
- Router: [src/Nav.tsx](src/Nav.tsx#L1) and navigation helper: [src/NavigationService.ts](src/NavigationService.ts#L1)
- Screens barrel: `src/screens/index` — Nav imports named exports from there
- State: `src/stores` (Redux + persistor)
- Cross-cutting helpers: `src/helpers` (Firebase, Notification, TTS, Analytics)
- Chat/AI: [src/ChatGPTProvider.tsx](src/ChatGPTProvider.tsx#L1) and `components/ChatGPTRoot`

3) Important workflows & commands
- Install deps (Yarn v3/Berry):

```bash
yarn install
```
- `patch-package` runs in `postinstall`. To create or update a patch use:

```bash
yarn create-patch
```
- Common scripts (see `package.json`): `yarn start`, `yarn android`, `yarn ios`, `yarn android-dev` (uses .env.dev), `yarn android-release-prod` (ENVFILE=.env.prod), `yarn test`, `yarn lint`.
- When changing native iOS pods run:

```bash
cd ios && pod install
```

4) Project-specific conventions
- Absolute imports are used widely (configured in `babel.config.js`/`metro.config.js`); prefer imports like `import { LocalizationProvider } from 'LocalizationProvider'` over deep relative paths.
- Screens are exported from `src/screens/index`. When adding a screen, export it from the barrel and register it in `src/Nav.tsx`.
- Centralize platform/native calls in `src/helpers` (e.g., `FirebaseAnalyticHelper`, `NotificationHelper`, `TextToSpeechHelper`). Reuse helpers rather than duplicating native bridging logic.

5) Integrations & cross-component patterns
- Firebase: `@react-native-firebase/*` packages are used across helpers.
- Chat streaming: conversations flow through `ChatGPTProvider` -> `ChatGPTRoot` -> UI components; use `ChatGPTPContext` for posting messages and handling stop events.
- Navigation + state: screens expect Redux + persisted state; keep provider ordering in `src/App.tsx` when modifying providers.

6) Build caveats & PR checklist
- Do not remove `postinstall` or the `patches/` directory — native module fixes live there.
- Run `yarn lint` and `yarn test` before PRs.
- If you change native modules, run `yarn create-patch` and commit the new patch under `patches/`.
- If adding UI screens, export them from `src/screens/index` and wire them in `src/Nav.tsx`.

7) Fast examples
- Programmatic navigation: `NavigationService.navigate('MainTabScreen', { screen: 'HomeScreen' })` ([src/NavigationService.ts](src/NavigationService.ts#L1)).
- Post a streaming chat message: call `ChatGPTPContext.postStreamedMessage()` from a component consuming the context ([src/ChatGPTProvider.tsx](src/ChatGPTProvider.tsx#L1)).

If you want, I can expand any section with: (a) a list of helper methods in `src/helpers`, (b) common Jest test examples, or (c) a sample PR checklist file. Tell me which one to expand.
# Copilot / AI Agent Instructions for this repo

Purpose: give an AI coding agent the exact, actionable knowledge to be productive in this React Native app.

1) Big picture
- This is a React Native TypeScript mobile app (see [src/App.tsx](src/App.tsx#L1)).
- Main composition: global providers are assembled in `src/App.tsx` — `ThemeProvider`, `LocalizationProvider`, `Redux` store (`stores`), `PersistGate`, and the `NavigationContainer` which mounts `Nav` (see [src/Nav.tsx](src/Nav.tsx#L1)).
- Navigation: top-level router in `src/Nav.tsx` with a navigation helper `src/NavigationService.ts` for programmatic navigation.
- Chat/AI surface: chat helpers and a provider live in `src/ChatGPTProvider.tsx` and `components/ChatGPTRoot` (provider exposes `ChatGPTPContext`).

2) Key directories & files to reference
- App entry: [src/App.tsx](src/App.tsx#L1)
- Navigation: [src/Nav.tsx](src/Nav.tsx#L1) and [src/NavigationService.ts](src/NavigationService.ts#L1)
- State: `stores` folder (Redux store + persistor used in App)
- Screens: `src/screens` (Nav imports many named exports from `screens` index)
- APIs & helpers: `src/apis` and `src/helpers` (Firebase, Notification, TTS, etc.)
- ChatGPT integration: [src/ChatGPTProvider.tsx](src/ChatGPTProvider.tsx#L1) and `components/ChatGPTRoot`
- Project config: `package.json`, `babel.config.js`, `tsconfig.json`, `metro.config.js` — these determine module resolution and absolute import paths used across `src`.

3) Developer workflows & important scripts (copy/paste)
- Install deps (repo uses Yarn v3):

```bash
yarn install
```

- After install patch-package runs automatically (see `postinstall` script). To create a patch use:

```bash
yarn create-patch
```

- Common run commands (from `package.json`):

```bash
yarn start           # metro
yarn android         # react-native run-android
yarn ios             # react-native run-ios
yarn android-dev     # run android with .env.dev
yarn android-release-prod  # assembleRelease with ENVFILE=.env.prod
yarn test            # jest
yarn lint            # eslint .
```

- iOS native dependencies: run `cd ios && pod install` when changing native pods.
- Native assets: use `yarn link-asset` to run `react-native-asset` helper.

4) Environment & build notes discovered in repo
- Project uses `react-native-config` and multiple `.env.*` flavors — scripts set `ENVFILE` via `cross-env` (see `package.json`). Prefer using the provided `android-dev`, `android-std`, `android-prod` scripts for consistent env usage.
- The repo uses `patch-package` (see `patches/`) — don't remove `postinstall` or patches will not be applied.
- Node engine: >=18 (see `package.json`), package manager set to `yarn@3.6.4`.

5) Project-specific conventions & patterns
- Absolute imports are used widely (e.g., `import {LocalizationProvider} from 'LocalizationProvider'`), so trust `babel.config.js` / `module-resolver` settings — prefer following existing absolute paths rather than introducing long relative paths.
- Screens are re-exported from `src/screens/index` and imported as named imports (`import { SplashScreen, LoginScreen } from 'screens'`). When adding screens, add them to the `screens` barrel.
- Centralized helpers: cross-cutting concerns live in `src/helpers` (FirebaseAnalyticHelper, NotificationHelper, TextToSpeechHelper). Use these helper modules rather than duplicating native interactions.
- Chat integration: `ChatGPTProvider` exposes `ChatGPTPContext` with `postStreamedMessage` and `onChatGPTStop`. When integrating new chat features, interact with this context.

6) Tests & linting
- Tests run with `yarn test` (Jest). There is a `__tests__` folder — follow existing test patterns.
- Linting: `yarn lint` uses eslint; respect repo ESLint and Prettier configs (`.eslintrc` / `prettier` settings in repo).

7) Integrations and external services to be aware of
- Firebase: multiple firebase packages used (`@react-native-firebase/*`) and helpers in `src/helpers`.
- AppCenter / CodePush references exist in README notes — releases may be performed with AppCenter scripts (not in `package.json`), check appcenter CLI if automating releases.
- Many native modules (ads, IAP, messaging, analytics) — changing native deps requires updating Android `gradle` files and running `pod install` for iOS.

8) When making changes, checklist for PRs
- Run `yarn lint` and `yarn test` locally.
- If native dependency changed: update `patches/` if a workaround is needed and run `yarn create-patch` then commit the patch under `patches/`.
- If adding a new screen, export it from `src/screens/index` and register it in `src/Nav.tsx`.
- Preserve absolute import style; update `babel.config.js` only if strictly necessary.

9) Useful examples from the codebase
- Programmatic navigation example: use `NavigationService.navigate('MainTabScreen', {screen: 'HomeScreen'})` (see [src/NavigationService.ts](src/NavigationService.ts#L1)).
- Provider composition example: app-level providers are composed in [src/App.tsx](src/App.tsx#L1).
- Chat API usage: call `ChatGPTPContext.postStreamedMessage()` (see [src/ChatGPTProvider.tsx](src/ChatGPTProvider.tsx#L1)).

If any of these sections look incomplete or you want me to expand examples (e.g., list of important helper methods, tests to run, or a sample PR checklist), tell me which area and I'll iterate.
