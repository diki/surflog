import * as actions from 'store/actions';
import { IMatch, IStatistics } from './index';

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
}

export interface IStore {
  matches: IMatch[];
  statistics: IStatistics;
  ui: IUIState;
}

export type Actions = {
  [fnName in keyof typeof actions]: typeof actions[fnName]
};
