import { TweenLite } from 'gsap';

export const qs = (string, el = document) => el.querySelector(string);
export const qsAll = (string, el = document) => el.querySelectorAll(string);
export const getElementDimensions = el => ({
  width: el.offsetWidth,
  height: el.offsetHeight,
});

export const getScreen = () => ({
  scrollY: window.scrollY,
  width: window.innerWidth,
  height: window.innerHeight,
});

export const getScroll = () => ({
  scrollY: window.scrollY,
  deltaY: 0,
});

export const getClientRect = el => {
  const d = el.getBoundingClientRect();
  return {
    left: d.left || d.x,
    right: d.right || d.y,
    x: d.x || d.left,
    y: d.y || d.top,
    top: d.top,
    bottom: d.bottom,
    width: d.width,
    height: d.height,
  };
};

export const isFunction = function(obj) {
  return typeof obj == 'function' || false;
};

/*************
    VIEWPORT
*************/

export const isMobileViewport = () => getScreen().width < 600;
export const isMediumViewport = () =>
  getScreen().width > 600 && getScreen().width < 992;
export const isLargeViewport = () => getScreen().width > 1200;
export const isSmallHeight = () => getScreen().height < 480;

const FULLY_SCREEN_PERCENT = 0.25;
const PARTIALLY_SCREEN_PERCENT = 0.82;
const JUST_PARTIALLY_SCREEN_PERCENT = 0.98;

export const isElementInView = (domRect, screen) => {
  const fullyS = screen.height * FULLY_SCREEN_PERCENT;
  const halfS = screen.height * PARTIALLY_SCREEN_PERCENT;
  const partiallyS = screen.height * PARTIALLY_SCREEN_PERCENT;
  const justS = screen.height * JUST_PARTIALLY_SCREEN_PERCENT;
  return {
    x: domRect.x,
    y: domRect.y,
    width: domRect.width,
    height: domRect.height,
    fully: Math.abs(domRect.y) >= 0 && Math.abs(domRect.y) <= fullyS,
    half: Math.abs(domRect.y) > 0 && Math.abs(domRect.y) < halfS,
    partially: Math.abs(domRect.y) > 0 && Math.abs(domRect.y) < partiallyS,
    entering:
      Math.abs(domRect.y) < screen.height && Math.abs(domRect.y) > partiallyS,
    justEntering:
      Math.abs(domRect.y) < screen.height && Math.abs(domRect.y) > justS,
    inactive: Math.abs(domRect.y) > screen.height - 1,
  };
};

export const clamp = (val, min, max) => Math.max(min, Math.min(val, max));
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

const div = document.createElement('div');
const prefixes = ['Webkit', 'Moz', 'O', 'ms'];
export const prefixStyle = prop => {
  const style = div.style;
  if (prop in style) {
    return prop;
  }
  const titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (let i = prefixes.length; i >= 0; i--) {
    const name = prefixes[i] + titleCase;
    if (name in style) {
      return name;
    }
  }
  return false;
};

export const scale = (
  parentWidth,
  parentHeight,
  childWidth,
  childHeight,
  contains
) => {
  const doRatio = childWidth / childHeight;
  const cRatio = parentWidth / parentHeight;
  let width = parentWidth;
  let height = parentHeight;

  if (contains ? doRatio > cRatio : doRatio < cRatio) {
    height = width / doRatio;
  } else {
    width = height * doRatio;
  }

  return {
    width,
    height,
    x: (parentWidth - width) / 2,
    y: (parentHeight - height) / 2,
  };
};

export const tweenWindowScroll = () => {
  let data = {
    y: window.scrollY,
  };
  TweenLite.to(data, 0.6, {
    y: getScreen().height,
    onUpdate: () => window.scrollTo(0, data.y),
  });
};
