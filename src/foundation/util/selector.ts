export type DOMTarget =
  | Element
  | string
  | null
  | ArrayLike<Element | string | null>;

export function selector(
  query: string,
  context = document.body
): HTMLElement[] {
  return Array.from(context.querySelectorAll(query));
}
