import React, { ChangeEvent, Component } from 'react';
import { sources } from 'utils';

class RecordedPagesSlide extends Component {
  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      const { currentIndex } = this.state;
      this.setState({
        currentIndex: (currentIndex + 1) % Object.values(sources).length,
      });
    }, 2000);
  }

  render() {
    const pages = Object.values(sources);
    const page = pages[this.state.currentIndex];
    return (
      <div className="f3">
        <i
          className={`${page.font} f4`}
          style={{
            color: page.color,
          }}
        />
        <div className="dib ml1">
          {pages[this.state.currentIndex].humanReadable}
        </div>
      </div>
    );
  }
}

export default RecordedPagesSlide;
