export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (
  a: number,
  b: number,
  op: Operation
): number => {
  if (op === 'multiply') {
    return a * b;
  }

  if (op === 'add') {
    return a + b;
  }

  if (op === 'divide') {
    return a / b;
  }

  throw new Error('Invalid operation');
};
