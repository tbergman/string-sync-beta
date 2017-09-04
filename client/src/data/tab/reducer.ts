import { SET_MEASURES_PER_LINE, FOCUS_MEASURE } from './actions';

interface StoreTab {
  focused: number;
  measuresPerLine: number;
}

const defaultState: StoreTab = Object.freeze({
  focused: 0,
  measuresPerLine: 1
});

export default (state = defaultState, action): StoreTab => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case SET_MEASURES_PER_LINE:
      nextState.measuresPerLine = action.measuresPerLine;
      return nextState;

    case FOCUS_MEASURE:
      nextState.focused = action.measure;
      return nextState;

    default:
      return nextState;
  }
};
