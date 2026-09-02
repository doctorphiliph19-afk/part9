export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export const parseNumberArgument = (argument: string): number => {
  const num = Number(argument);
  if (isNotNumber(argument)) {
    throw new Error(`Argument of value '${argument}' is not a number!`);
  }
  return num;
};

export default "Utility module for parsing and validation";
