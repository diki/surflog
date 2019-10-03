import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import AppHeader from 'components/AppHeader';
import Landing from 'components/Landing';
import Stage from './Stage';
import * as actions from 'store/actions';

import { Actions, IStore, IUIState } from '@types';

interface IDispatchProps {
  actions: Actions;
}

type PropsType = IStore & IDispatchProps;

interface IState {
  confirmed: string | null | boolean;
}

class App extends React.Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      confirmed: localStorage.getItem('confirmed'),
    };
  }

  render(): JSX.Element {
    return (
      <main className="stage pa4 pt5">
        <AppHeader
          onClickInfo={() =>
            chrome.tabs.create({
              active: true,
              url: 'https://github.com/diki/surflog',
            })
          }
          ui={this.props.ui}
        />
        {this.state.confirmed ? (
          <Stage {...this.props} />
        ) : (
          <Landing
            onConfirmed={() => {
              localStorage.setItem('confirmed', JSON.stringify(true));
              this.setState({ confirmed: true });
            }}
            onClickInfo={() => {
              chrome.tabs.create({
                active: true,
                url: 'https://github.com/diki/surflog',
              });
            }}
          />
        )}
      </main>
    );
  }
}

function mapStateToProps(state: IStore): IStore {
  return {
    matches: state.matches,
    statistics: state.statistics,
    ui: state.ui,
    latest: state.latest,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
