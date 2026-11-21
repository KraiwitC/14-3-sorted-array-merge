# Q14 3 Sorted Array Merge

A TypeScript module that merges three pre-sorted integer arrays into a single ascending-sorted array.

## Function Interface

```ts
export function merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[]
): number[]
```

- `collection_1`: Sorted from max to min (descending).
- `collection_2`: Sorted from min to max (ascending).
- `collection_3`: Sorted from min to max (ascending).
- Return value: Sorted from min to max (ascending).

## Getting Started

### 1. Requirements
- Node.js `>= 22.12.0`
- `npm` or `pnpm`

### 2. Install Dependencies
```bash
pnpm install
# or npm install
```

## 3. Compiling and Executing

Build the project:

```bash
pnpm build
# or npm run build
```

Example usage:

```ts
import { merge } from './src/merge.ts';

const collection_1 = [9, 6, 3];
const collection_2 = [1, 4, 7];
const collection_3 = [2, 5, 8];

const result = merge(collection_1, collection_2, collection_3);
console.log(result);
```

## 4. Running Unit Tests

```bash
pnpm test
# or npm test
```
