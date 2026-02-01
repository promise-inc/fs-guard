# @promise-inc/fs-guard

Validate project folder and file structure. Enforce conventions in CI and locally.

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/fs-guard/main/assets/demo.svg" alt="fs-guard CLI output demo" width="680" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/fs-guard/main/assets/usage.svg" alt="fs-guard config example" width="680" />
</p>

## Why?

Teams lose consistency over time:

- Random files appearing in `src/`
- Missing required entry points (`index.tsx`, `routes.ts`)
- Files that don't follow naming conventions (`useFetch.jsx` instead of `useFetch.ts`)
- Nested folders going too deep

`fs-guard` catches structural violations **before they reach your codebase**.

## Install

```bash
npm install @promise-inc/fs-guard --save-dev
```

## Usage

```bash
# Validate using config file
npx fs-guard

# Validate using a built-in preset
npx fs-guard --preset nestjs

# List all available presets
npx fs-guard --list
```

### As a Git Hook

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "fs-guard"
    }
  }
}
```

Or with `lint-staged`:

```json
{
  "lint-staged": {
    "*": "fs-guard"
  }
}
```

## Presets

Built-in presets for popular stacks — use directly or extend with custom rules.

| Category | Presets |
|----------|--------|
| **Backend** | `nestjs`, `node-ts`, `node-js` |
| **Frontend** | `react-ts`, `react-js`, `nextjs`, `vite-react` |
| **Mobile** | `react-native-ts`, `react-native-js`, `expo` |

```bash
# Use a preset directly
npx fs-guard --preset nestjs
```

### Extend a preset

```json
{
  "preset": "nextjs",
  "rules": {
    "app/dashboard": {
      "required": ["page.tsx", "layout.tsx"]
    }
  }
}
```

Preset rules are merged with your custom rules. Your rules take priority on conflicts.

> See the [`examples/`](./examples) folder for a config file per stack.

## Configuration

Create `fs-guard.config.json`, `fs-guard.config.ts`, `fs-guard.config.js`, or add an `fs-guard` field to `package.json`:

```ts
export default {
  root: "src",
  rules: {
    "pages": ["index.tsx", "*"],
    "components": "*",
    "services": ["*.ts"],
    "hooks": ["use*.ts"],
  },
  ignore: ["node_modules", "dist", ".git"],
};
```

### Rule Syntax

| Syntax | Meaning | Example |
|--------|---------|---------|
| `"*"` | Directory must exist, any files allowed | `"components": "*"` |
| `["file.ts"]` | Specific file must exist | `"pages": ["index.tsx"]` |
| `["*.ts"]` | All files must match pattern | `"services": ["*.ts"]` |
| `["index.tsx", "*"]` | Required file + allow others | `"pages": ["index.tsx", "*"]` |
| `["use*.ts"]` | Files must match naming convention | `"hooks": ["use*.ts"]` |

### Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `root` | `string` | — | Root directory to validate |
| `rules` | `Record<string, RuleValue>` | — | Validation rules per directory |
| `ignore` | `string[]` | `["node_modules", "dist", ".git"]` | Directories to skip |
| `preset` | `string` | — | Built-in preset to extend |

### Advanced Rules (object syntax)

```ts
export default {
  root: "src",
  rules: {
    "hooks": {
      required: ["index.ts"],
      pattern: "use*.ts",
      maxDepth: 1,
    },
  },
};
```

| Field | Type | Description |
|-------|------|-------------|
| `required` | `string[]` | Files that must exist |
| `pattern` | `string` | Naming pattern for all files |
| `maxDepth` | `number` | Max nesting depth allowed |

## Programmatic API

```ts
import { fsGuard, loadConfig } from "@promise-inc/fs-guard";

const config = await loadConfig(process.cwd());
const result = await fsGuard(config);

console.log(result.passed);      // true | false
console.log(result.violations);  // Violation[]
console.log(result.checked);     // string[]
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All rules passed |
| `1` | Violations found |
| `2` | Internal error (missing config, etc.) |

## Design Principles

- **Zero dependencies** — Only Node.js built-ins (`fs/promises`, `path`)
- **Deterministic** — Same structure always produces same output
- **CI-friendly** — Exit codes, no interactive prompts
- **Fast** — Direct filesystem checks, no AST parsing
- **Simple** — Solve one problem well

## How to report bugs

To report a bug, please first read our guide on [opening issues](https://github.com/promise-inc/fs-guard/issues).

## How to contribute code

To open a pull request, please first read our guide on [opening pull requests](https://github.com/promise-inc/fs-guard/pulls), which outlines our process for RFCs and pull requests.

## Also by Promise Inc.

| Package | Description |
|---------|-------------|
| [`@promise-inc/ai-guard`](https://github.com/promise-inc/ai-guard) | Detect AI-generated code patterns |
| [`@promise-inc/ps-guard`](https://github.com/promise-inc/ps-guard) | Lighthouse-based performance guard |
| [`@promise-inc/devlog`](https://github.com/promise-inc/devlog) | Logger with automatic context (file + line) |
| [`@promise-inc/ui-states`](https://github.com/promise-inc/ui-states) | Auto-generated skeleton loading states |
| [`@promise-inc/dev-reel`](https://github.com/promise-inc/dev-reel) | Animated SVG previews for READMEs |

---

Developed by [Promise Inc.](https://promise.codes)

## License

MIT © [Promise Inc.](https://promise.codes)
