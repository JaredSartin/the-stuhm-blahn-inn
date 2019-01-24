import { autobind } from 'core-decorators';
import AppComponent from 'components/app';
import Emitter from 'common/emitter';
import ProgressiveImage from 'components/progressive-image'
import ProgressivePicture from 'components/progressive-picture'
import { qs, qsAll } from 'utils';

import 'partials/examples/ExamplesPartial.scss';

class Components extends AppComponent {
  constructor(props = {}) {
    super(props);
  }

  onDomLoaded() {
    super.onDomLoaded();

    const progressiveImages = qsAll('.progressive-image')
    progressiveImages.forEach( image => {
      new ProgressiveImage( image )
    })

    const progressivePictures = qsAll('.progressive-picture')
    progressivePictures.forEach( picture => {
      new ProgressivePicture( picture )
    })

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
export default new Components();
