export function assert(expr: unknown, msg: string) {
  if (!expr) {
    throw new Error(`[module] ${msg}`);
  }
}
