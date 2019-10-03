import * as actions from 'store/actions';
import { IMatch, IStatistics, IRecord } from './index';

export interface IAction {
  type: string;
  payload?: any;
}

export interface IUIState {
  isSearched: boolean;
  showStatistics: boolean;
  mode: string;
  query: string;
  resultsArrived: boolean;
  latestSource: string;
}

export interface IStore {
  matches: IMatch[];
  statistics: IStatistics;
  ui: IUIState;
  latest: IRecord[];
}

export type Actions = {
  [fnName in keyof typeof actions]: typeof actions[fnName]
};
