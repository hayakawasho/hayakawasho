import SplitType from "split-type";

export const splitTextNode2Words = (text: HTMLElement) => {
  return SplitType.create(text, {
    lineClass: "_l",
    tagName: "span",
    types: "words, lines",
    wordClass: "_w",
  });
};
