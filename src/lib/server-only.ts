if (typeof window !== "undefined" && process.env.VITEST !== "true") {
  throw new Error("Tutorial API client is server-only and must not be imported by browser components.");
}

export {};
