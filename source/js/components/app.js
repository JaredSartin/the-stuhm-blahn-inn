import '@babel/polyfill';
import { autobind } from 'core-decorators';
import 'sass/global.scss';
import 'partials/footer/FooterPartial.scss';
import Detector from 'common/detector';
import Emitter from 'common/emitter';
import PageComponent from 'components/page';
import HeaderPartial from 'partials/header/HeaderPartial';
import { qs, getScreen, getScroll } from 'utils';

export default class App extends PageComponent {
  constructor(props = {}) {
    super(props);
  }

  onLoad() {
    const classes = [
      Detector.isFirefox ? 'is-firefox' : null,
      Detector.isIE ? 'is-ie' : null,
      Detector.isIE11Down ? 'is-limited' : 'is-full',
    ].filter(v => !!v);
    if (classes.length) {
      classes.forEach(cz => document.body.classList.add(cz));
    }
  }

  onDomLoaded() {
    this.header = new HeaderPartial({ el: qs('.header') });
    window.addEventListener('scroll', this._onScrollAndEmit);
    window.addEventListener('touchstart', this._touchStart, false);
    window.addEventListener('touchmove', this._touchMove, false);
    window.addEventListener('resize', this._onResizeAndEmit);
  }

  // eslint-disable-next-line
  @autobind
  _onScrollAndEmit(e) {
    const { deltaY } = e;
    Emitter.emit('scroll', {
      ...getScroll(),
      ...{
        scrollY: window.scrollY,
        deltaY: deltaY || this.deltaY || 0,
      },
    });
  }

  // eslint-disable-next-line
  @autobind
  _touchStart(e) {
    this.touchY = e.touches[0].pageY;
  }

  @autobind
  _touchMove(e) {
    this.deltaY = this.touchY - e.touches[0].pageY;
  }

  @autobind
  _onResizeAndEmit(e) {
    Emitter.emit('resize', getScreen());
  }
}
