import 'sass/global.scss';

class Page {
  constructor(props) {
    document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
    window.addEventListener('load', this.onLoad.bind(this));
  }

  onLoad(e) {}

  onDomLoaded(e) {}
}

export default Page;
