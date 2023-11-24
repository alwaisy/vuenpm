import { scroll } from 'quasar';
const { getScrollTarget, setVerticalScrollPosition } = scroll;

export function getDom(elRef: string) {
  const el = document.querySelector(elRef) as HTMLElement;
  return el;
}

// takes an element object
export const scrollToElement = (el: HTMLElement, duration = 1000) => {
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const scrollDuration = duration;
  setVerticalScrollPosition(target, offset, scrollDuration);
};
