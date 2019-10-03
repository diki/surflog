import React from 'react';

import SearchBar from 'components/SearchBar';
import ResultsList from 'components/ResultsList';
import Statistics from 'components/Statistics';
import SmallInfoBar from 'components/SmallInfoBar';
import Latest from 'components/LatestVisits';

import { Actions, IStore } from '@types';

interface IDispatchProps {
  actions: Actions;
}
type PropsType = IStore & IDispatchProps;

class SearchScreen extends React.Component<PropsType> {
  render(): JSX.Element {
    const { matches, statistics, actions, ui } = this.props;
    return (
      <div>
        <SearchBar actions={actions} query={ui.query} />
        <div className="flex justify-end fw2">
          <a
            className="db pv2 pointer fw5"
            style={{
              textIndent: 6,
              marginRight: -16,
              color: '#373232',
              textDecoration: 'underline',
            }}
            onClick={() => actions.setUI({ key: 'mode', value: 'manage' })}
          >
            Manage records
          </a>
        </div>
        {ui.resultsArrived && (
          <SmallInfoBar
            totalResultsFound={matches.length}
            onClickManage={() =>
              actions.setUI({ key: 'mode', value: 'manage' })
            }
          />
        )}
        {ui.query.length === 0 && (
          <div>
            {/* <Statistics
              storage={statistics.storage}
              onClickManage={() =>
                actions.setUI({ key: 'mode', value: 'manage' })
              }
            /> */}
            <Latest records={this.props.latest} ui={this.props.ui} />
          </div>
        )}
        {ui.resultsArrived && (
          <ResultsList
            items={matches}
            isFirstSearchDone={ui.isSearched}
            query={ui.query}
          />
        )}
      </div>
    );
  }
}

export default SearchScreen;
