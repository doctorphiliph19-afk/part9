const multiplier = (a: number, b: number): number => {
  return a * b;
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(multiplier(a, b));
