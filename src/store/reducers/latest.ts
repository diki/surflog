import { Reducer } from 'redux';
import { IAction, IRecord } from '@types';
import { MATCHES_SET_LATEST } from '../contants';

const latestReducer: Reducer<IRecord[], IAction> = (state = [], action) => {
  switch (action.type) {
    case MATCHES_SET_LATEST:
      return action.payload;
    default:
      return state;
  }
};

export default latestReducer;
