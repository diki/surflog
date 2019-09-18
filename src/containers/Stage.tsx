import React from 'react';

import SearchScreen from './SearchScreen';
import ManageRecords from 'components/ManageRecords';

import { Actions, IStore } from '@types';

interface IDispatchProps {
  actions: Actions;
}
type PropsType = IStore & IDispatchProps;

class Stage extends React.Component<PropsType> {
  componentDidMount() {
    this.props.actions.getStatistics();
  }

  render(): JSX.Element {
    const { statistics, ui } = this.props;
    return (
      <main>
        {ui.mode === 'search' && <SearchScreen {...this.props} />}
        {ui.mode === 'manage' && (
          <ManageRecords statistics={statistics} actions={this.props.actions} />
        )}
      </main>
    );
  }
}

export default Stage;
