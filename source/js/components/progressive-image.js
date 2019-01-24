import { autobind } from 'core-decorators';
import { qs, qsAll } from 'utils'
import InViewObserver from 'components/in-view-observer'
import ImagePlaceholder from 'components/image-placeholder'

class ProgressiveImage extends ImagePlaceholder {
  constructor(el, options={}) {
    const placeholder = qs('.image-placeholder', el)
    super(placeholder, options)

    new InViewObserver( el, {
      onReveal: this.load
    })
  }
}

export default ProgressiveImage;
