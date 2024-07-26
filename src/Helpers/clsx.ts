export const clsx = (...args: unknown[]) => {
  return args.flat().filter(Boolean).join(" ");
};