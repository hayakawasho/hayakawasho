export type DOMTarget =
  | Element
  | string
  | null
  | ArrayLike<Element | string | null>

export const selector = (query: string, context = document.body) => {
  return Array.from(context.querySelectorAll(query))
}
