import { autobind } from 'core-decorators';
import { qs, qsAll } from 'utils'
import InViewObserver from 'components/in-view-observer'
import ProgressiveImage from 'components/progressive-image'

class ProgressivePicture extends ProgressiveImage {
  constructor(el, options={}) {
    super(el, options)

    const sources = qsAll('source', el)
    this.ratios = new Array().filter.call(sources, source => {
      return source.dataset && source.dataset.aspectRatio
    })

    if (this.ratios.length > 0) {
      this.mediaQueries = []
      this.ratios.map( (source, index) => {
        const { aspectRatio } = source.dataset
        const media = source.getAttribute('media')

        if (index === this.ratios.length - 1) {
          this.defaultRatio = aspectRatio
        } else {
          const mediaCheck = window.matchMedia(media)
          mediaCheck.addListener(this.checkMediaQueries)

          this.mediaQueries.push({ aspectRatio, mediaCheck })
        }
      })

      this.checkMediaQueries()
    }
  }

  /**
   * Makes sure the ratio is the right size if this uses sources
   */
  @autobind
  checkMediaQueries () {
    let matchingRatio = this.defaultRatio

    const isMatch = (query) => query.matches
    const match = this.mediaQueries.find( query => {
      return isMatch(query.mediaCheck)
    })

    if (match) matchingRatio = match.aspectRatio

    const isNewRatio = this.currentRatio !== matchingRatio
    if (isNewRatio) this.setAspectRatio(matchingRatio)

    this.currentRatio = matchingRatio
  }
}

export default ProgressivePicture;
