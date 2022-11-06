export type CisccError = {
  error: string;
  context?: {
    description: string;
    [key: string]: unknown;
  } | null;
};

export function standardizeError(e: unknown): CisccError {
  return e instanceof Error
    ? {
        error: e.name,
        context: extractContext(e),
      }
    : { error: JSON.stringify(e) };
}

export function extractContext(error: Error): CisccError["context"] {
  const otherProperties = Object.getOwnPropertyNames(error).reduce(
    (acc: Record<string, unknown>, key: string) => {
      // Don't print error stacks and error messages.
      if (["stack", "message", "name"].includes(key)) return acc;

      acc[key] = (error as any)[key];
      return acc;
    },
    {}
  );

  return {
    description: error.message ?? "",
    ...otherProperties,
  };
}
