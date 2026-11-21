export function merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[]
): number[] {
  let i = collection_1.length - 1;
  let j = 0;
  let k = 0;
  const result: number[] = [];

  while (i >= 0 || j < collection_2.length || k < collection_3.length) {
    const v1 = i >= 0 ? (collection_1[i] ?? Infinity) : Infinity;
    const v2 = j < collection_2.length ? (collection_2[j] ?? Infinity) : Infinity;
    const v3 = k < collection_3.length ? (collection_3[k] ?? Infinity) : Infinity;

    if (v1 <= v2 && v1 <= v3) {
      result.push(v1);
      i--;
    } else if (v2 <= v3) {
      result.push(v2);
      j++;
    } else {
      result.push(v3);
      k++;
    }
  }

  return result;
}
