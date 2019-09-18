import React, { ChangeEvent } from 'react';
import Dropdown from 'react-dropdown';
import { sources } from 'utils';

const options = [
  { value: 'all', label: 'all websites' },
  ...Object.values(sources).map((s: any) => ({
    value: s.code,
    label: s.humanReadable,
  })),
];

interface PropsType {
  actions: {
    search: ({ query, source }: { query: string; source: string }) => void;
  };
  query: string;
}

interface StateType {
  inputValue: string;
  searchOn: string;
}

class SearchBar extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      inputValue: props.query,
      searchOn: 'all',
    };
  }

  render() {
    return (
      <div style={{ margin: '0 -16px' }}>
        <div className="f4 pb3 black-70">
          Search{' '}
          <Dropdown
            className="f4 dib v-btm bb b--gray fw3 black-50"
            controlClassName="none bn-ns pb0 fw4 mr2"
            menuClassName="source-dropdown-menu"
            arrowClassName="source-dropdown-arrow"
            options={options}
            onChange={this.handleSourceChange}
            value={this.state.searchOn}
            placeholder="Select an option"
          />{' '}
        </div>
        <div>
          <input
            className="pa2 w-100 f5 fw3"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="enter keyword"
            style={{ outline: 'none' }}
            defaultValue={this.props.query}
          />
        </div>
      </div>
    );
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({
      inputValue: value,
    });
    this.props.actions.search({
      query: value,
      source: this.state.searchOn,
    });
  };

  handleSourceChange = (event: any) => {
    this.setState(
      {
        searchOn: event.value,
      },
      () =>
        this.props.actions.search({
          query: this.state.inputValue,
          source: this.state.searchOn,
        }),
    );
  };
}

export default SearchBar;
