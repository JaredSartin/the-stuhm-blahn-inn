import { autobind } from 'core-decorators';
import { qs } from 'utils';

/**
 * List of classes used.
 * @type {Object}
 */

 const DISPLAY_CLASSES = {
   IS_LOADED: 'is-loaded',
 };

class ImagePlaceholder {
  constructor(el, options={}) {
    this.el = el;
    this.shouldLog = options.shouldLog
    this.image = qs('img', this.el);
    this.onLoaded = options.onLoaded;
    this.aspectRatio = this.el.dataset.aspectRatio
    console.log(this.image)
  }

  /**
   * Reveals the image once it's loaded, also triggers onLoaded callback
   */
  @autobind
  _handleImageLoaded () {
    this.image.classList.add(DISPLAY_CLASSES.IS_LOADED)

    if (this.onLoaded) this.onLoaded();
  }

  /**
   * Loads the image
   */
   @autobind
   load() {
     const src = this.image.getAttribute('data-src');
     const srcset = this.image.getAttribute('data-srcset');
     const alt = this.image.getAttribute('data-alt');
     const classes = this.image.getAttribute('data-class');

     this.image.addEventListener('load', this._handleImageLoaded);
     this.image.setAttribute('src', src);
     if (srcset) this.image.setAttribute('srcset', srcset);
     if (alt) this.image.setAttribute('alt', alt);
     if (classes) this.image.classList.add(classes)
   }

   /**
    * Sets the aspect ratio
    */
    @autobind
    setAspectRatio(ratio) {
      const ratioPercentage = ratio * 100
      this.el.style.paddingTop = `${ratioPercentage}%`
    }
}

export default ImagePlaceholder
