# Project Specification: Three-Way Sorted Array Merge (TypeScript)

## 1. Objective
Implement a minimal TypeScript repository providing a `merge` function that combines three pre-sorted integer arrays into a single ascending-sorted array, accompanied by unit tests and setup/execution documentation.

## 2. Hard Constraints
- **Package Manager:** Use `pnpm` exclusively (`pnpm install`, `pnpm build`, `pnpm test`).
- **Zero Test-Framework Dependencies:** Use Node.js's built-in test runner (`node:test`) and assertion module (`node:assert/strict`) with Node's native TypeScript execution (`node --test`). Do NOT install Vitest, Vite, Jest, `tsx`, or `ts-node`.
- **Strict Scope (No Extra Files or Dependencies):** Do NOT add unrequested files (`src/index.ts`, ESLint, Prettier, Docker, etc.) or extra packages. Only create the 6 files defined in Section 4.
- **No Sorting Functions:** Do NOT call `Array.prototype.sort()`, `Array.prototype.toSorted()`, or any sorting helper anywhere in the codebase.
- **Zero Code Comments:** Do NOT include any comments (`//`, `/* ... */`, JSDoc, or `#`) in any source, test, or configuration file.
- **No Input Mutation:** Treat `collection_1`, `collection_2`, and `collection_3` as read-only; never mutate them.

## 3. Functional Specification

### 3.1 Function Signature
```ts
export function merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[]
): number[]
```

### 3.2 Input & Output Contract
- `collection_1`: Integer array sorted in **descending** order (`max` to `min`). May be empty.
- `collection_2`: Integer array sorted in **ascending** order (`min(0)` to `max`). May be empty.
- `collection_3`: Integer array sorted in **ascending** order (`min(0)` to `max`). May be empty.
- **Return value:** A new `number[]` containing all elements from all three inputs sorted in **ascending** order.

### 3.3 Algorithm & Complexity
Use a single-pass **three-pointer merge** written in erasable TypeScript syntax (no enums, namespaces, or parameter properties):
1. Initialize pointers:
   - `i = collection_1.length - 1` (reads `collection_1` backward from `min` to `max`)
   - `j = 0` (reads `collection_2` forward from `min` to `max`)
   - `k = 0` (reads `collection_3` forward from `min` to `max`)
2. Initialize `result: number[] = []`.
3. Loop while `i >= 0 || j < collection_2.length || k < collection_3.length`:
   - `const v1 = i >= 0 ? (collection_1[i] ?? Infinity) : Infinity`
   - `const v2 = j < collection_2.length ? (collection_2[j] ?? Infinity) : Infinity`
   - `const v3 = k < collection_3.length ? (collection_3[k] ?? Infinity) : Infinity`
   - Select the smallest value among `v1`, `v2`, and `v3`, push it to `result`, and advance the corresponding pointer (`i--`, `j++`, or `k++`).
4. Return `result`.

- **Time Complexity:** $O(n_1 + n_2 + n_3)$
- **Auxiliary Space Complexity:** $O(n_1 + n_2 + n_3)$ for the output array ($O(1)$ extra working memory)

## 4. Repository Structure

```text
.
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   └── merge.ts
└── tests/
    └── merge.test.ts
```

## 5. File Specifications

### 5.1 `package.json`
Install the latest `typescript` and `@types/node` via `pnpm add -D typescript @types/node` so `package.json` records the exact latest semver ranges:
```json
{
  "name": "merge-sorted-arrays",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "node --test tests/merge.test.ts"
  }
}
```

### 5.2 `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "outDir": "dist",
    "types": ["node"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src", "tests"]
}
```

### 5.3 `.gitignore`
```text
node_modules
dist
```

### 5.4 `src/merge.ts`
Implement and export `merge` strictly per Section 3 with zero comments.

### 5.5 `tests/merge.test.ts`
Write unit tests importing `describe`, `it` from `node:test`, `assert` from `node:assert/strict`, and `merge` from `../src/merge.ts`, with zero comments, covering:
1. Merging three non-empty sorted arrays (`collection_1` descending, `collection_2` and `collection_3` ascending).
2. All three arrays empty (`[]`, `[]`, `[]` -> `[]`).
3. One or two arrays empty while remaining array(s) have elements.
4. Single-element arrays across all three inputs.
5. Duplicate numbers within an array and across all three arrays.
6. Arrays of unequal lengths.
7. Boundary value `0`, negative numbers, and large arrays (e.g., 10,000 elements each).
8. Input immutability (verifying `collection_1`, `collection_2`, and `collection_3` are not mutated).

### 5.6 `README.md`
Keep concise and cover:
- Function interface and complexity ($O(n_1 + n_2 + n_3)$).
- Prerequisites (Node.js 22.18+ / 24 LTS+ and `pnpm`).
- Installing dependencies (`pnpm install`).
- Compiling and executing the code (`pnpm build` and example usage).
- Running unit tests (`pnpm test`).

## 6. Verification Checklist for Antigravity
Before finishing, verify:
1. Only the 6 specified files exist (plus `pnpm-lock.yaml`).
2. `pnpm install` succeeds cleanly.
3. `pnpm build` compiles both `src/` and `tests/` into `dist/` with zero TypeScript errors.
4. `pnpm test` runs `node --test tests/merge.test.ts` and passes all unit tests.
5. No file in `src/` or `tests/` contains `//`, `/*`, `*/`, `.sort(`, or `.toSorted(`.