import SplitType from "split-type";
import type { SplitTypeOptions } from "split-type";

export const splitTextNode2Words = (textNode: HTMLElement) => {
  const options = {
    lineClass: "_l",
    tagName: "span",
    types: "words, lines",
    wordClass: "_w",
  } as SplitTypeOptions;

  const split = new SplitType(textNode, options);

  return {
    onSplitUpdate: () => split.split(options),
    split,
  } as const;
};
