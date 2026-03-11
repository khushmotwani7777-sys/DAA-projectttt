export type AlgorithmType = 'merge' | 'quick' | 'bubble' | 'heap';
export type SearchAlgorithmType = 'binary' | 'hashing';

export interface SortingStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  message: string;
}

export interface QueryLog {
  id: string;
  queryId: string;
  algorithm: SearchAlgorithmType;
  time: number;
  comparisons: number;
  status: 'found' | 'not_found';
  timestamp: string;
}
