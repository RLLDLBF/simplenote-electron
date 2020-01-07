import { getIpcRenderer } from '../../utils/electron';

import { Action } from '../action-types';

const ipc = getIpcRenderer();

export const setFontSize = fontSize => ({
  type: 'setFontSize',
  fontSize,
});

export const increaseFontSize = () => (dispatch, getState) => {
  const {
    settings: { fontSize },
  } = getState();

  dispatch(setFontSize(fontSize + 1));
};

export const decreaseFontSize = () => (dispatch, getState) => {
  const {
    settings: { fontSize },
  } = getState();

  dispatch(setFontSize(fontSize - 1));
};

export const resetFontSize = () => setFontSize(undefined);

export const activateTheme = theme => ({
  type: 'setTheme',
  theme,
});

export const setNoteDisplay = noteDisplay => ({
  type: 'setNoteDisplay',
  noteDisplay,
});

export const setLineLength = lineLength => ({
  type: 'setLineLength',
  lineLength,
});

export const toggleSortOrder = () => (dispatch, getState) => {
  dispatch({
    type: 'setSortReversed',
    sortReversed: !getState().settings.sortReversed,
  });
};

export const setSortType = sortType => ({
  type: 'setSortType',
  sortType,
});

export const toggleSortTagsAlpha = () => (dispatch, getState) => {
  dispatch({
    type: 'setSortTagsAlpha',
    sortTagsAlpha: !getState().settings.sortTagsAlpha,
  });
};

export const setMarkdown = markdownEnabled => ({
  type: 'setMarkdownEnabled',
  markdownEnabled,
});

export const setAccountName = accountName => ({
  type: 'setAccountName',
  accountName,
});

export const setWPToken = token => ({
  type: 'setWPToken',
  token,
});

export const toggleFocusMode = () => (dispatch, getState) => {
  dispatch({
    type: 'setFocusMode',
    focusModeEnabled: !getState().settings.focusModeEnabled,
  });
};

export const toggleSpellCheck = () => (dispatch, getState) => {
  dispatch({
    type: 'setSpellCheck',
    spellCheckEnabled: !getState().settings.spellCheckEnabled,
  });
};

export const toggleAutoHideMenuBar = () => (dispatch, getState) => {
  const newValue = !getState().settings.autoHideMenuBar;

  ipc.send('setAutoHideMenuBar', newValue);

  dispatch({
    type: 'setAutoHideMenuBar',
    autoHideMenuBar: newValue,
  });
};

export type SetFontSize = Action<'FONT_SIZE_SET', { size: number }>;
export type IncreaseFontSize = Action<'FONT_SIZE_INCREASE', {}>;
export type DecreaseFontSize = Action<'FONT_SIZE_DECREASE', {}>;
export type ResetFontSize = Action<'FONT_SIZE_RESET', {}>;

export type SettingsAction =
  | SetFontSize
  | IncreaseFontSize
  | DecreaseFontSize
  | ResetFontSize;
