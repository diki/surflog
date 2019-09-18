import { sources } from 'utils';

export interface IRecord {
  id: string;
  content: string;
  lastVisitedTime: number;
  title: string;
  link: string;
  page: keyof typeof sources;
}

export interface IStorage {
  usage: number;
  quota: number;
  count: number;
}

export interface IStatistics {
  storage: IStorage;
  usage: Array<[string, number]>;
}

export interface IMatch {
  record: IRecord;
  ref: string;
  matchData: {
    content?: {
      position: Array<number[]>;
    };
    title?: {
      position: Array<number[]>;
    };
  };
}

export interface ISupportedWebsite {
  code: string;
  humanReadable: string;
  logo?: string;
  font?: string;
  color?: string;
}

export { IAction, IStore, IUIState, Actions } from './store';
