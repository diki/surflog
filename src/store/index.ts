import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { IAction, IStore } from '@types';
import rootReducer from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore<IStore, IAction, any, any>(
    rootReducer,
    {},
    compose(
      applyMiddleware(epicMiddleware),
      // tslint:disable: whitespace
      (<any>window).devToolsExtension
        ? (<any>window).devToolsExtension()
        : // tslint:disable-next-line: only-arrow-functions
          function(f: any) {
            return f;
          },
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
