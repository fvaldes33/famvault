import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, LayoutType } from '~/types';
import { reducer } from './app.reducers';

export interface ProductPageStateContext {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const defaultState: AppState = {
  ready: false,
  layout: LayoutType.Anonymous,
};

const Context = createContext<ProductPageStateContext>({
  state: defaultState,
  dispatch: () => undefined,
});

const { Consumer, Provider } = Context;

export const AppContextProvider: React.FC<{
  initialState?: Partial<AppState>;
  children: ReactNode;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });
  const value = { state, dispatch };

  return <Provider value={value}>{children}</Provider>;
};

export { Consumer, Context, Provider };
