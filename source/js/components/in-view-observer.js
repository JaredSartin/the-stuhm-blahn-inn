import { autobind } from 'core-decorators';
import { isFunction } from 'utils'
/**
 * List of classes used.
 * @type {Object}
 */

 const DISPLAY_CLASSES = {
   IS_REVEALED: 'is-revealed',
   IS_HIDDEN: 'is-hidden',
 };

class InViewObserver {
  constructor(el, options={}) {
    this.el = el;
    
    this.revealDelay = options.revealDelay || 0;
    this.hideDelay = options.hideDelay || 0;
    // when true, element will reveal when the top of the element is visible
    // instead of the default behavior of revealing when the bottom if visible
    this.revealFromTop = options.revealFromTop
    // offset can be either a value or function; for example, if you wanted the
    // offset to be 20% of the screen height, you'd need a function that gets
    // the current screen height first since that's a value that can change
    this.offset = options.offset || 0
    this.onReveal = options.onReveal;
    this.onHide = options.onHide;
    this._hide()
    window.addEventListener('scroll', this._onScroll);
    this._onScroll();
  }

  /**
   * Check scroll state and hide/show based on what's set.
   */
  @autobind
  _onScroll() {
    this._checkInView();

    if (this.inView && !this.isRevealed) {
      this.isRevealed = true;
      this._reveal();
    }
  }

  /**
   * Check if trigger element is in view yet
   */
  @autobind
  _checkInView() {
    const { innerHeight } = window;
    const { top, height } = this.el.getBoundingClientRect()

    const offset = isFunction(this.offset) ? this.offset(this.el) : this.offset
    // reveals the animation if the entire element is in the viewport
    const heightOffset = this.revealFromTop ? 0 : height
    const inView = (top - innerHeight) + heightOffset - offset <= 0;
    this.inView = inView;
  }

  /**
   * Reveal the element
   */
  _reveal() {
    this.el.style.animationDelay = this.revealDelay + 'ms';

    this.el.classList.remove(DISPLAY_CLASSES.IS_HIDDEN);
    this.el.classList.add(DISPLAY_CLASSES.IS_REVEALED);

    if (this.onReveal) {
      setTimeout(this.onReveal, this.revealDelay);
    }
  }

  /**
   * Hide the element
   */
  _hide() {
    this.el.style.animationDelay = this.hideDelay + 'ms';

    this.el.classList.remove(DISPLAY_CLASSES.IS_REVEALED);
    this.el.classList.add(DISPLAY_CLASSES.IS_HIDDEN);

    if (this.onHide) {
      setTimeout(this.onHide, this.hideDelay);
    }
  }
}

export default InViewObserver;
