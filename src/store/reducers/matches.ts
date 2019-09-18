import { Reducer } from 'redux';
import { IAction, IMatch } from '@types';
import { MATCHES_SET, MATCHES_GET } from '../contants';

const matchesReducer: Reducer<IMatch[], IAction> = (state = [], action) => {
  switch (action.type) {
    case MATCHES_SET:
      return action.payload;
    default:
      return state;
  }
};

export default matchesReducer;
