import {
  STATISTICS_GET_USAGE,
  STATISTICS_GET_STORAGE,
  MATCHES_GET,
  RECORDS_DOWNLOAD,
} from 'store/contants';
import { ActionCreator } from 'redux';
import { IAction } from '@types';

export const search: ActionCreator<IAction> = payload => ({
  type: MATCHES_GET,
  payload,
});

export const deleteRecords: ActionCreator<IAction> = (payload): IAction => ({
  type: '@records/delete',
  payload,
});

export const download: ActionCreator<IAction> = (payload): IAction => ({
  type: RECORDS_DOWNLOAD,
  payload,
});

export const upload: ActionCreator<IAction> = ({ fileInput }): IAction => ({
  type: '@records/upload',
  payload: {
    fileInput,
  },
});

export const getStatistics: ActionCreator<IAction> = payload => ({
  type: STATISTICS_GET_STORAGE,
  payload,
});

export const getSummary: ActionCreator<IAction> = () => ({
  type: STATISTICS_GET_USAGE,
});

export const setUI: ActionCreator<IAction> = payload => ({
  type: '@ui/set',
  payload,
});
