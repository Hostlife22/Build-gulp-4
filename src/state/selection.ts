import {
  getObject,
  ROOM_VIEW,
  type CameraTarget,
  type ObjectId,
} from '../config/objects';

export interface SelectionState {
  selected: ObjectId | null;
}
export type SelectionAction =
  { type: 'select'; id: ObjectId } | { type: 'reset' };

export const initialSelection: SelectionState = { selected: null };
export function selectionReducer(
  state: SelectionState,
  action: SelectionAction,
): SelectionState {
  if (action.type === 'reset') return initialSelection;
  return state.selected === action.id ? state : { selected: action.id };
}
export function cameraTarget(state: SelectionState): CameraTarget {
  return state.selected ? getObject(state.selected).focus : ROOM_VIEW;
}
