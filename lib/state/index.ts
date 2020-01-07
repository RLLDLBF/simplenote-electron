/**
 * Top-level of app state tree
 *
 * All data should flow through here
 */

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { omit } from 'lodash';

import appState from '../flux/app-state';

import auth from './auth/reducer';
import settings from './settings/reducer';
import ui from './ui/reducer';

import * as T from '../types';
import { AppAction } from './actions';

export type AppState = {
  dialogs: unknown[];
  editorMode: T.EditorMode;
  editingTags: boolean;
  filter: string;
  isOffline: boolean;
  isViewingRevisions: boolean;
  listTitle: T.TranslatableString;
  nextDialogKey: number;
  note?: T.NoteEntity;
  notes: T.NoteEntity[] | null;
  preferences?: T.Preferences;
  previousIndex: number;
  revision: T.NoteEntity | null;
  searchFocus: boolean;
  selectedNoteId: T.EntityId | null;
  shouldPrint: boolean;
  showNavigation: boolean;
  showNoteInfo: boolean;
  showTrash: boolean;
  tags: T.TagEntity[];
  tag?: T.TagEntity;
  unsyncedNoteIds: T.EntityId[];
};

export const reducers: Reducer<State, AppAction> = combineReducers({
  appState: appState.reducer.bind(appState) as Reducer<AppState, AppAction>,
  auth,
  settings,
  ui,
});

export type State = {
  appState: AppState;
  auth: ReturnType<typeof auth>;
  settings: ReturnType<typeof settings>;
  ui: ReturnType<typeof ui>;
};

export const store = createStore<State, AppAction, {}, {}>(
  reducers,
  compose(
    persistState('settings', {
      key: 'simpleNote',
      slicer: path => state => ({
        // Omit property from persisting
        [path]: omit(state[path], 'focusModeEnabled'),
      }),
    }),
    applyMiddleware(thunk)
  )
);

export type MapDispatchToPropsFunction<DispatchProps, OwnProps> = (
  dispatch: <T extends AppAction>(action: T) => T,
  ownProps: OwnProps
) => DispatchProps;

export type MapDispatchToProps<DispatchProps, OwnProps> =
  | MapDispatchToPropsFunction<DispatchProps, OwnProps>
  | { [P in keyof DispatchProps]: (...args: any[]) => AppAction };

export default store;
