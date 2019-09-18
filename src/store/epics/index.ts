import { ofType, combineEpics, Epic } from 'redux-observable';
import {
  mapTo,
  delay,
  tap,
  debounceTime,
  concatMap,
  ignoreElements,
  map,
  switchMap,
  mergeMap,
  filter,
} from 'rxjs/operators';

import { of, concat, fromEventPattern, iif } from 'rxjs';
import {
  STATISTICS_GET_STORAGE,
  STATISTICS_SET_STORAGE,
  STATISTICS_GET_USAGE,
  STATISTICS_SET_USAGE,
  APP_NAME,
  MATCHES_GET,
  MATCHES_SET,
  RECORDS_DOWNLOAD,
  RECORDS_UPLOAD,
  RECORDS_DELETE,
} from 'store/contants';
import { IAction, IRecord, IStore } from '@types';

const messages = fromEventPattern(
  handler => chrome.runtime.onMessage.addListener(handler),
  handler => chrome.runtime.onMessage.removeListener(handler),
  (request, sender, sendResponse) => ({ request, sender, sendResponse }),
);

const port = chrome.runtime.connect({ name: APP_NAME });

const searchEpic: Epic<IAction> = action$ =>
  action$.pipe(
    ofType(MATCHES_GET),
    debounceTime(300),
    filter(({ payload }) => payload.query.length > 0),
    tap(({ type, payload }) => {
      port.postMessage({
        type,
        ...payload,
      });
    }),
    switchMap(() =>
      messages.pipe(
        mergeMap(({ request }) =>
          iif<IAction, IAction>(
            () => request.type === MATCHES_SET,
            concat(
              of({
                type: MATCHES_SET,
                payload: request.payload,
              }),
              of({
                type: '@ui/set',
                payload: {
                  key: 'isSearched',
                  value: true,
                },
              }),
              of({
                type: '@ui/set',
                payload: {
                  key: 'showStatistics',
                  value: false,
                },
              }),
            ),
          ),
        ),
      ),
    ),
  );

const statisticsEpic: Epic<IAction> = action$ =>
  action$.pipe(
    ofType(STATISTICS_GET_STORAGE),
    tap(({ type }) => {
      port.postMessage({
        type,
      });
    }),
    switchMap(() =>
      messages.pipe(
        mergeMap(({ request }) =>
          iif<IAction, IAction>(
            () => request.type === STATISTICS_SET_STORAGE,
            concat(
              of({
                type: STATISTICS_SET_STORAGE,
                payload: request.payload,
              }),
              of({
                type: '@ui/set',
                payload: {
                  key: 'showStatistics',
                  value: true,
                },
              }),
            ),
          ),
        ),
      ),
    ),
  );

const downloadEpic: Epic<any> = action$ =>
  action$.pipe(
    ofType(RECORDS_DOWNLOAD),
    tap(({ type }) => {
      port.postMessage({
        type,
      });
    }),
    switchMap(() =>
      messages.pipe(
        tap(({ request }) => {
          const blob = new Blob([JSON.stringify(request.result)], {
            type: 'application/json',
          });
          const url = URL.createObjectURL(blob);
          chrome.downloads.download({
            url,
            filename: 'suflog-import.json',
          });
        }),
      ),
    ),
  );

const uploadEpic: Epic<IAction> = action$ =>
  action$.pipe(
    ofType(RECORDS_UPLOAD),
    tap(({ payload: { fileInput } }) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const records: IRecord[] = JSON.parse(data as string);
        port.postMessage({
          type: RECORDS_UPLOAD,
          records,
        });
      };
      reader.readAsText(fileInput);
    }),
    ignoreElements(),
  );

const getSummaryEpic: Epic<IAction, IAction> = action$ =>
  action$.pipe(
    ofType(STATISTICS_GET_USAGE),
    tap(({ type }) => {
      port.postMessage({
        type,
      });
    }),
    switchMap(() =>
      messages.pipe(
        mergeMap(({ request }) => {
          return iif<IAction, IAction>(
            () => request.type === STATISTICS_SET_USAGE,
            of({
              type: STATISTICS_SET_USAGE,
              payload: request.payload,
            }),
          );
        }),
      ),
    ),
  );

const deleteRecordsEpic: Epic<IAction, IAction> = action$ =>
  action$.pipe(
    ofType(RECORDS_DELETE),
    tap(({ type, payload }) => {
      port.postMessage({
        type,
        payload,
      });
    }),
    ignoreElements(),
  );

export default combineEpics(
  searchEpic,
  statisticsEpic,
  downloadEpic,
  uploadEpic,
  getSummaryEpic,
  deleteRecordsEpic,
);
