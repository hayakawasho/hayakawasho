import SplitType from 'split-type';
import type { SplitTypeOptions } from 'split-type';

export const splitTextNode2Words = (textNode: HTMLElement) => {
  const options = {
    lineClass: '_l',
    tagName: 'span',
    types: 'words, lines',
    wordClass: '_w',
  };

  const split = new SplitType(textNode, options as SplitTypeOptions);

  return {
    onSplitUpdate: () => split.split(options as SplitTypeOptions),
    split,
  } as const;
};
