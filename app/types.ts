declare global {
  interface Window {
    ENV: { [key: string]: string };
  }
}

export interface RootLoader {
  ENV: { [key: string]: string };
  session: boolean;
}

export enum LayoutType {
  Authenticated = 'authenticated',
  Anonymous = 'anonymous'
}

export type UnSavedRow<T> = Omit<T, 'id'>;

export type Profile = {
  id: string;
  name: string;
  email: string;
}

export type OpenGraph = {
  title?: string | null;
  image?: string | null;
  description?: string | null;
  icon?: string | null;
};

export type Family = {
  id: number;
  name: string;
  members?: {
    user_id: string;
  }[];
}

export type Secret = {
  id?: number;
  family_id?: number;
  uid?: string;
  title: string;
  website?: string;
  username: string;
  pass: string;
  icon?: string;
  strength?: number;
}

export type Record = {
  website: string;
  username: string;
  pass: string;

  id?: number;
  family_id?: number;
  title?: string;
  description?: string;
  open_graph?: string;
  strength?: number;
}

export interface AppState {
  ready: boolean;
  layout: LayoutType;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};

export enum Action {
  SetReady = 'set-ready',
  SetLayout = 'set-layout'
}

export interface ActionTypes {
  [Action.SetReady]: { ready: boolean };
  [Action.SetLayout]: { layout: LayoutType };
}

export type AppAction = ActionMap<ActionTypes>[keyof ActionMap<ActionTypes>];
