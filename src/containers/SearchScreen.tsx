import React from 'react';

import SearchBar from 'components/SearchBar';
import ResultsList from 'components/ResultsList';
import Statistics from 'components/Statistics';
import SmallInfoBar from 'components/SmallInfoBar';

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
        {ui.resultsArrived && (
          <SmallInfoBar
            totalResultsFound={matches.length}
            onClickManage={() =>
              actions.setUI({ key: 'mode', value: 'manage' })
            }
          />
        )}
        {ui.query.length === 0 && (
          <Statistics
            storage={statistics.storage}
            onClickManage={() =>
              actions.setUI({ key: 'mode', value: 'manage' })
            }
          />
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
