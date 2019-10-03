import { combineReducers } from 'redux';
import matches from './matches';
import statistics from './statistics';
import ui from './ui';
import latest from './latest';
import { IStore, IAction } from '@types';

const rootReducer = combineReducers<IStore, IAction>({
  matches,
  statistics,
  ui,
  latest,
});

export default rootReducer;
