import SplitType from "split-type";

export const splitTextNode2Words = (text: HTMLElement) => {
  return SplitType.create(text, {
    tagName: "span",
    types: "words",
    wordClass: "_w",
  });
};
