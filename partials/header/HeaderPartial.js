import 'partials/header/HeaderPartial.scss';
import { autobind } from 'core-decorators';
import Emitter from 'common/emitter';
import Partial from 'components/partial';
import { qs, qsAll, isMediumViewport } from 'utils';

export default class HeaderPartial extends Partial {
  constructor(props) {
    super(props);
    this.el = props.el;
    this.main = qs('.main');
    this.checkbox = qs('.header-hamburger input', this.el);
    this.sideMenu = qs('.header-side-menu', this.el);
    this.hideNav = false;
    this.previousScroll = 0;
    this.threshold = 20;
    this.thresholdCounter = 0;
    this.lastScrollDirection = 0;
    this.lastHeaderState = this.hideNav;

    if (Detector.hasTouch) {
      this.checkbox.addEventListener('touchend', this._onClick);
    } else {
      this.checkbox.addEventListener('click', this._onClick);
    }

    this.navItems = Array.from(qsAll('.header-nav__item', this.el));

    this.addListeners();

    Emitter.on('resize', this.onResize);
    this.sideMenu.classList.add('is-loaded');

  }

  addListeners() {
    this.navItems.forEach(el => {
      el.addEventListener('mouseover', this._onMouseOver);
      el.addEventListener('mouseout', this._onMouseOut);
    });

    window.addEventListener('scroll', this._onScroll);
  }

  @autobind
  onResize() {
    if (isMediumViewport() && this.isMenuOpen) {
      this._closeMenu();
    }
  }

  get isMenuOpen() {
    return this.el.classList.contains('is-open');
  }

  _toggleMobileMenu() {
    this.el.classList.toggle('is-open');
    this.main.classList.toggle('is-open--sidemenu');
  }

  @autobind
  _onClick(e) {
    this._toggleMobileMenu();
    if (this.isMenuOpen) {
      this.main.addEventListener('click', this._closeMenu);
    } else {
      this.main.removeEventListener('click', this._closeMenu);
    }
  }

  /**
   * Close mobile menu.
   */
  @autobind
  _closeMenu(e) {
    if (this.isMenuOpen) {
      this.checkbox.checked = false;
      this._toggleMobileMenu();
    }
  }

  /**
   * Check scroll state and hide/show based on what's set.
   */
  @autobind
  _onScroll() {
    this._changeScrollState();

    if (this.hideNav) {
      this._hideMainNav();
    } else {
      this._showMainNav();
    }
  }

  /**
   * Remove sticky class to hide nav
   */
  _hideMainNav() {
    this.el.classList.remove('is-sticky');
    this.el.classList.add('past-threshold');
    this.el.classList.remove('inverted');
  }

  /**
   * Add sticky class to show nav
   */
  _showMainNav() {
    this.el.classList.remove('inverted');
    this.el.classList.remove('past-threshold');
    this.el.classList.add('is-sticky');
    if (window.scrollY > 800) {
      this.el.classList.add('inverted');
    }
  }

  /**
   * Check scroll direction and set the state of the navigation (hide/show)
   */
  _changeScrollState() {
    let navHeight = this.el.offsetHeight;
    let currentScroll = window.scrollY;
    let scrollDirection = (currentScroll < this.previousScroll) ? -1 : 1;

    // Reset thresholdCounter if scrollDirection is changed
    if (scrollDirection === this.lastScrollDirection) {
      this.thresholdCounter++;
    } else {
      this.thresholdCounter = 0;
    }

    // Scrolled past header
    if (currentScroll > navHeight) {
      // User scrolled the same direction for longer than our threshold
      if (this.thresholdCounter >= this.threshold) {
        this.hideNav = (scrollDirection > 0);
      }
    } else {
      this.hideNav = false;
    }

    this.previousScroll = currentScroll;
    this.lastScrollDirection = scrollDirection;
    this.lastHeaderState = this.hideNav;
  }
}
