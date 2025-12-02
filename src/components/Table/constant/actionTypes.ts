// constants/actionTypes.ts
export const ActionTypes = {
  SELECT_ROW: "SELECT_ROW",
  SELECT_ALL: "SELECT_ALL",
  START_EDITING: "START_EDITING",
  STOP_EDITING: "STOP_EDITING",
  DELETE_ROW: "DELETE_ROW",
} as const;

export type ActionType = (typeof ActionTypes)[keyof typeof ActionTypes];
