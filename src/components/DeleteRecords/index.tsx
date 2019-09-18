import React from 'react';
import Dropdown from '../Dropdown';

import { sources, rangeOptions } from 'utils';

const options = ['all', ...Object.values(sources).map(s => s.code)];

interface PropsType {
  onCancel: () => void;
  onClear: (s: StateType) => void;
}

interface StateType {
  source: string;
  range: string;
}

class DeleteRecords extends React.Component<PropsType, StateType> {
  state = {
    source: options[0],
    range: rangeOptions[0].value,
  };

  render() {
    return (
      <div
        className="shadow-1 white"
        style={{
          width: '100%',
          background: '#000000b0',
        }}
      >
        <div className="w-100 flex flex-column f5 pv3 pl3 pr0">
          <div className="form-line">
            <div
              className="mr3 fw3 f5"
              style={{
                flex: 2,
                color: '#edf6fff2',
              }}
            >
              Source
            </div>
            <div style={{ flex: 4 }}>
              <Dropdown
                options={options}
                onChange={this.handleSourceChange}
                value={this.state.source}
                small
              />
            </div>
          </div>
          <div className="form-line" style={{ minWidth: 240, marginTop: 16 }}>
            <div
              className="mr3 fw3 f5"
              style={{
                flex: 2,
                color: '#edf6fff2',
              }}
            >
              Time range
            </div>
            <div style={{ flex: 4 }}>
              <Dropdown
                options={rangeOptions}
                onChange={this.handleRangeChange}
                value={this.state.range}
                small
              />
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <button
            className="sl--button __t1"
            style={{ marginRight: 16, background: '#4d5052ed' }}
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
          <button
            className="sl--button mr3 __t2"
            style={{ background: '#737475e6' }}
            onClick={this.handleClickClear}
          >
            Clear data
          </button>
        </div>
      </div>
    );
  }

  handleSourceChange = (e: { value: string }) => {
    this.setState({
      source: e.value,
    });
  };

  handleRangeChange = (e: { value: string }) => {
    this.setState({
      range: e.value,
    });
  };

  handleClickClear = () => {
    this.props.onClear(this.state);
  };
}

export default DeleteRecords;
