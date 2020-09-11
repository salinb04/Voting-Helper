"use strict";

const e = React.createElement;

class ScrollButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    return e(
      "button",
      {
        onClick: () =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          }),
      },
      "Back to Top"
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document
  .querySelectorAll("#scroll-to-top-container")
  .forEach((domContainer) => {
    ReactDOM.render(e(ScrollButton), domContainer);
  });
