export const deepMerge = <T>(target: T, source: Partial<T>): T => {
  // Iterate over the properties of the source object
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];

      // If the property is an object and not null, recursively merge
      if (
        sourceValue &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue)
      ) {
        if (!target[key]) {
          target[key] = {} as any; // Initialize target property if it doesn't exist
        }
        target[key] = deepMerge(target[key], sourceValue); // Recursive merge
      } else {
        // If it's not an object, directly assign the value
        target[key] = sourceValue as any; // Safe assignment since sourceValue can be undefined
      }
    }
  }
  return target;
};

export const clearEmptyFields = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
