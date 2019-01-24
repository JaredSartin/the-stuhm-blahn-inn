import { autobind } from 'core-decorators';
import AppComponent from 'components/app';
import Emitter from 'common/emitter';
import ProgressiveImage from 'components/progressive-image'
import { qs, qsAll } from 'utils';

import 'partials/examples/ExamplesPartial.scss';
import 'partials/hero/HeroPartial.scss';

class Home extends AppComponent {
  constructor(props = {}) {
    super(props);
  }

  onDomLoaded() {
    super.onDomLoaded();

    const progressiveImages = qsAll('.progressive-image')
    if (progressiveImages) {
      progressiveImages.forEach( image => {
        new ProgressiveImage( image, { offset: window.innerHeight / 2})
      })
    }

    this._addListeners();
  }

  _addListeners() {
    Emitter.on('scroll', this._onScroll);
    Emitter.on('resize', this._onResize);
  }

  @autobind
  _onScroll(data) {
  }

  @autobind
  _onResize(data) {
  }
}
export default new Home();
