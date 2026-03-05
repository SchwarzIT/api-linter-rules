// Mock Math.random before ANY imports to avoid Wizer trapping during componentization
if (
  typeof (globalThis as any).Math.random === "undefined" ||
  (globalThis as any).Math.random.toString().indexOf("native code") !== -1
) {
  (globalThis as any).Math.random = () => 0.5;
}

// Polyfill process
if (typeof (globalThis as any).process === "undefined") {
  (globalThis as any).process = {
    env: { NODE_ENV: "production" },
    cwd: () => "/",
    platform: "browser",
    nextTick: (fn: any, ...args: any[]) => setTimeout(() => fn(...args), 0),
  };
}
