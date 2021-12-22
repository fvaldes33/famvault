import { AppState, AppAction, Action } from '~/types';

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case Action.SetReady:
      return {
        ...state,
        ready: true
      };
    case Action.SetLayout:
      const { layout } = action.payload;
      return {
        ...state,
        layout
      };
    default:
      return {
        ...state
      };
  }
}
