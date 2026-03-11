import { SortingStep } from '../types';

export function bubbleSort(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        message: `Comparing ${array[j]} and ${array[j + 1]}`
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          message: `Swapping ${array[j + 1]} and ${array[j]}`
        });
      }
    }
    sorted.push(n - i - 1);
  }
  
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: `Sorting Complete!`
  });

  return steps;
}

export function quickSort(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const array = [...arr];

  function partition(low: number, high: number) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: [],
        message: `Comparing ${array[j]} with pivot ${pivot}`
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, j],
          sorted: [],
          message: `Swapping ${array[j]} and ${array[i]}`
        });
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [],
      message: `Pivot ${pivot} placed at index ${i + 1}`
    });
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, array.length - 1);
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    message: `Sorting Complete!`
  });
  return steps;
}

export function mergeSort(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const array = [...arr];

  function merge(l: number, m: number, r: number) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = array.slice(l, m + 1);
    const R = array.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      steps.push({
        array: [...array],
        comparing: [l + i, m + 1 + j],
        swapping: [],
        sorted: [],
        message: `Comparing ${L[i]} and ${R[j]}`
      });
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      k++;
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [k - 1],
        sorted: [],
        message: `Merging element into position ${k - 1}`
      });
    }

    while (i < n1) {
      array[k] = L[i];
      i++;
      k++;
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [k - 1],
        sorted: [],
        message: `Merging remaining element into position ${k - 1}`
      });
    }

    while (j < n2) {
      array[k] = R[j];
      j++;
      k++;
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [k - 1],
        sorted: [],
        message: `Merging remaining element into position ${k - 1}`
      });
    }
  }

  function sort(l: number, r: number) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  }

  sort(0, array.length - 1);
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    message: `Sorting Complete!`
  });
  return steps;
}
