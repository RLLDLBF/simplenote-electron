export const AUTH_SET = 'AUTH_SET';
export const TAG_DRAWER_TOGGLE = 'TAG_DRAWER_TOGGLE';

export type Action<
  T extends ActionTypes,
  Args extends { [extraProps: string]: any }
> = { type: T } & { [P in keyof Args]: Args[P] };

export type ActionTypes =
  | 'AUTH_SET'
  | 'FONT_SIZE_DECREASE'
  | 'FONT_SIZE_INCREASE'
  | 'FONT_SIZE_RESET'
  | 'FONT_SIZE_SET'
  | 'TAG_DRAWER_TOGGLE';
