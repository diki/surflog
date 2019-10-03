import { Reducer } from 'redux';
import { IUIState, IAction } from '@types';
import { MATCHES_GET, MATCHES_SET, MATCHES_GET_LATEST } from 'store/contants';

const uiReducer: Reducer<IUIState, IAction> = (
  state = {
    isSearched: false,
    showStatistics: false,
    mode: 'search',
    query: '',
    resultsArrived: false,
    latestSource: 'all',
  },
  action,
) => {
  switch (action.type) {
    case '@ui/set':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case MATCHES_GET:
      return {
        ...state,
        query: action.payload.query,
        resultsArrived: false,
      };
    case MATCHES_SET:
      return {
        ...state,
        resultsArrived: true,
      };
    case MATCHES_GET_LATEST:
      return {
        ...state,
        latestSource: action.payload.source,
      };
    default:
      return state;
  }
};

export default uiReducer;
