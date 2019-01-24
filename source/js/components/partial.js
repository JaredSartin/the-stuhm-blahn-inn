class Partial {
  constructor(props = {}) {
    this.props = props;
    this.el = props.el;
    this.init(props);
    if (props.classNames) {
      props.el.classList.add(props.classNames);
    }
  }

  init(props) {}
}

export default Partial;
