import { TAG_DRAWER_TOGGLE } from '../action-types';
import { Action } from '../action-types';

export const toggleTagDrawer = show => ({
  type: TAG_DRAWER_TOGGLE,
  show,
});

export type ToggleTagDrawer = Action<'TAG_DRAWER_TOGGLE', { show: boolean }>;

export type UIAction = ToggleTagDrawer;
