import { Reducer } from 'redux';
import { IStatistics, IAction } from '@types';
import { STATISTICS_SET_STORAGE, STATISTICS_SET_USAGE } from '../contants';

const statisticsReducer: Reducer<IStatistics, IAction> = (
  state = {
    usage: [],
    storage: {
      usage: 0,
      quota: 0,
      count: 0,
    },
  },
  action,
) => {
  switch (action.type) {
    case STATISTICS_SET_STORAGE:
      console.log('eeee', action, state);
      return {
        usage: state.usage,
        storage: action.payload,
      };
    case STATISTICS_SET_USAGE:
      console.log('usage', action, state);
      return {
        storage: state.storage,
        usage: action.payload,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
