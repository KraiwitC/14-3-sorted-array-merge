import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { merge } from '../src/merge.ts';

describe('merge', () => {
  it('merges three non-empty sorted arrays', () => {
    const c1 = [9, 5, 2];
    const c2 = [1, 4, 8];
    const c3 = [3, 6, 7];
    const result = merge(c1, c2, c3);
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('handles all three arrays empty', () => {
    const result = merge([], [], []);
    assert.deepStrictEqual(result, []);
  });

  it('handles one empty array', () => {
    const r1 = merge([], [1, 3], [2, 4]);
    assert.deepStrictEqual(r1, [1, 2, 3, 4]);

    const r2 = merge([4, 2], [], [1, 3]);
    assert.deepStrictEqual(r2, [1, 2, 3, 4]);

    const r3 = merge([4, 2], [1, 3], []);
    assert.deepStrictEqual(r3, [1, 2, 3, 4]);
  });

  it('handles two empty arrays', () => {
    const r1 = merge([5, 3, 1], [], []);
    assert.deepStrictEqual(r1, [1, 3, 5]);

    const r2 = merge([], [2, 4, 6], []);
    assert.deepStrictEqual(r2, [2, 4, 6]);

    const r3 = merge([], [], [1, 7, 9]);
    assert.deepStrictEqual(r3, [1, 7, 9]);
  });

  it('handles single-element arrays', () => {
    const result = merge([10], [5], [7]);
    assert.deepStrictEqual(result, [5, 7, 10]);
  });

  it('handles duplicate numbers within an array and across arrays', () => {
    const c1 = [5, 3, 3, 1];
    const c2 = [1, 3, 4, 6];
    const c3 = [3, 5, 5, 7];
    const result = merge(c1, c2, c3);
    assert.deepStrictEqual(result, [1, 1, 3, 3, 3, 3, 4, 5, 5, 5, 6, 7]);
  });

  it('handles arrays of unequal lengths', () => {
    const c1 = [20, 15, 10, 5, 1];
    const c2 = [2];
    const c3 = [3, 4, 12];
    const result = merge(c1, c2, c3);
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 10, 12, 15, 20]);
  });

  it('handles boundary value 0 and negative numbers', () => {
    const c1 = [5, 0, -3, -10];
    const c2 = [-8, -2, 0, 4];
    const c3 = [-5, 0, 2];
    const result = merge(c1, c2, c3);
    assert.deepStrictEqual(result, [-10, -8, -5, -3, -2, 0, 0, 0, 2, 4, 5]);
  });

  it('handles large arrays of 10000 elements each', () => {
    const size = 10000;
    const c1: number[] = [];
    const c2: number[] = [];
    const c3: number[] = [];

    for (let index = size - 1; index >= 0; index--) {
      c1.push(index * 3);
    }
    for (let index = 0; index < size; index++) {
      c2.push(index * 3 + 1);
      c3.push(index * 3 + 2);
    }

    const result = merge(c1, c2, c3);
    assert.strictEqual(result.length, size * 3);
    for (let index = 0; index < result.length; index++) {
      assert.strictEqual(result[index], index);
    }
  });

  it('preserves input immutability', () => {
    const c1 = Object.freeze([9, 5, 1]);
    const c2 = Object.freeze([2, 6, 8]);
    const c3 = Object.freeze([3, 4, 7]);

    const result = merge(c1, c2, c3);
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assert.deepStrictEqual(c1, [9, 5, 1]);
    assert.deepStrictEqual(c2, [2, 6, 8]);
    assert.deepStrictEqual(c3, [3, 4, 7]);
  });
});
